const { sendJson } = require("./_storage");

module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const rateResponse = await fetch("https://api.frankfurter.app/latest?from=USD&to=DOP", {
            headers: {
                accept: "application/json"
            }
        });

        if (!rateResponse.ok) {
            throw new Error("Unable to fetch live exchange rate.");
        }

        const payload = await rateResponse.json();
        const rate = Number(payload?.rates?.DOP);
        if (!Number.isFinite(rate) || rate <= 0) {
            throw new Error("Exchange rate response was invalid.");
        }

        return sendJson(response, 200, {
            base: "USD",
            quote: "DOP",
            rate,
            date: payload?.date || null,
            source: "Frankfurter"
        });
    } catch (error) {
        return sendJson(response, 502, {
            error: error.message || "Unable to fetch live exchange rate."
        });
    }
};
