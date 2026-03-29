const OpenAI = require("openai");

function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        const error = new Error("OPENAI_API_KEY is not configured.");
        error.statusCode = 500;
        throw error;
    }

    return new OpenAI({ apiKey });
}

function stripDataUrlPrefix(dataUrl) {
    return String(dataUrl || "").replace(/^data:[^;]+;base64,/, "");
}

function buildSchema() {
    return {
        type: "json_schema",
        name: "imported_logistics_document",
        strict: true,
        schema: {
            type: "object",
            additionalProperties: false,
            required: [
                "type",
                "refNumber",
                "date",
                "clientName",
                "clientAddress",
                "poNumber",
                "tags",
                "notes",
                "paymentTerms",
                "total",
                "items"
            ],
            properties: {
                type: {
                    type: "string",
                    enum: ["quote", "invoice"]
                },
                refNumber: {
                    type: "string"
                },
                date: {
                    type: "string"
                },
                clientName: {
                    type: "string"
                },
                clientAddress: {
                    type: "string"
                },
                poNumber: {
                    type: "string"
                },
                tags: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                notes: {
                    type: "string"
                },
                paymentTerms: {
                    type: "string"
                },
                total: {
                    type: "number"
                },
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        additionalProperties: false,
                        required: [
                            "description",
                            "quantity",
                            "unitPrice",
                            "totalPrice",
                            "totalPriceDop",
                            "usesDopTotal"
                        ],
                        properties: {
                            description: {
                                type: "string"
                            },
                            quantity: {
                                type: "number"
                            },
                            unitPrice: {
                                type: "number"
                            },
                            totalPrice: {
                                type: "number"
                            },
                            totalPriceDop: {
                                type: "number"
                            },
                            usesDopTotal: {
                                type: "boolean"
                            }
                        }
                    }
                }
            }
        }
    };
}

async function extractDocumentFromFile({ filename, mimeType, fileData }) {
    const openai = getOpenAIClient();
    const base64Data = stripDataUrlPrefix(fileData);

    const content = [
        {
            type: "input_text",
            text: [
                "Extract the logistics quote or invoice from this uploaded document.",
                "Return only the structured fields requested by the schema.",
                "If a field is missing, return an empty string, 0, or [] as appropriate.",
                "Normalize the document type to either quote or invoice.",
                "Normalize the date to YYYY-MM-DD when possible.",
                "Each line item should include description, quantity, unitPrice, totalPrice, totalPriceDop, and whether the source used DOP totals."
            ].join(" ")
        }
    ];

    if (mimeType === "application/pdf") {
        content.push({
            type: "input_file",
            filename,
            file_data: base64Data
        });
    } else {
        content.push({
            type: "input_image",
            image_url: fileData,
            detail: "high"
        });
    }

    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
            {
                role: "user",
                content
            }
        ],
        text: {
            format: buildSchema()
        }
    });

    if (!response.output_text) {
        const error = new Error("The AI service did not return structured document data.");
        error.statusCode = 502;
        throw error;
    }

    return JSON.parse(response.output_text);
}

module.exports = async function handler(request, response) {
    try {
        if (request.method !== "POST") {
            response.setHeader("Allow", "POST");
            return response.status(405).json({ error: "Method not allowed." });
        }

        const { filename, mimeType, fileData } = request.body || {};
        if (!filename || !mimeType || !fileData) {
            return response.status(400).json({ error: "Missing file upload details." });
        }

        if (!["application/pdf", "image/png", "image/jpeg", "image/webp"].includes(mimeType)) {
            return response.status(400).json({ error: "Unsupported file type." });
        }

        const document = await extractDocumentFromFile({ filename, mimeType, fileData });
        return response.status(200).json({ document });
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to import the uploaded document."
        });
    }
};
