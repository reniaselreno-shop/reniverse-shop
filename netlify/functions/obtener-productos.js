exports.handler = async function(event, context) {
  const SHOP_ID = process.env.PRINTIFY_SHOP_ID;
  const TOKEN = process.env.PRINTIFY_TOKEN;

  try {
    const response = await fetch(`https://printify.com{SHOP_ID}/products.json`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
