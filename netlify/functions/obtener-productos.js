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

  try {
    // Importamos dinámicamente fetch para que el servidor de Netlify no falle
    const { default: fetch } = await import('node-fetch');

    const response = await fetch(`https://printify.com{SHOP_ID}/products.json`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${TOKEN}`,
        'User-Agent': 'ReniverseShopApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Printify respondió con código: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error en la función:", error);
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
