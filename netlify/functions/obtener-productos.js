const https = require('https');

exports.handler = async function(event, context) {
    const SHOP_ID = process.env.PRINTIFY_SHOP_ID;
    const TOKEN = process.env.PRINTIFY_TOKEN;

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    return new Promise((resolve) => {
        const options = {
            hostname: 'api.printify.com',
            path: `/v1/shops/${SHOP_ID}/products.json`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'User-Agent': 'NetlifyFunction'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers,
                    body: data
                });
            });
        });

        req.on('error', (e) => {
            resolve({
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: e.message })
            });
        });

        req.end();
    });
};
