module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ error: "Method not allowed. Send localStorage data as JSON in POST body." });
    }

    try {
        const localStorageData = request.body;

        if (!localStorageData || typeof localStorageData !== "object") {
            return response.status(400).json({
                error: "Invalid data format. Send localStorage data as JSON object."
            });
        }

        // Extract relevant data
        const todosDocuments = localStorageData.todosDocuments;
        const todosClients = localStorageData.todosClients;

        const result = {
            found: {
                documents: !!todosDocuments,
                clients: !!todosClients
            },
            data: {}
        };

        if (todosDocuments) {
            try {
                const documents = JSON.parse(todosDocuments);
                result.data.documents = {
                    count: Array.isArray(documents) ? documents.length : 0,
                    sample: Array.isArray(documents) && documents.length > 0 ? documents.slice(0, 2) : []
                };
            } catch (e) {
                result.data.documents = { error: "Invalid JSON format" };
            }
        }

        if (todosClients) {
            try {
                const clients = JSON.parse(todosClients);
                result.data.clients = {
                    count: Array.isArray(clients) ? clients.length : 0,
                    sample: Array.isArray(clients) && clients.length > 0 ? clients.slice(0, 2) : []
                };
            } catch (e) {
                result.data.clients = { error: "Invalid JSON format" };
            }
        }

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json({
            error: "Analysis failed.",
            message: error.message || String(error)
        });
    }
};