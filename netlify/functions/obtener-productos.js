exports.handler = async function(event, context) {
  // Netlify inyectará de forma invisible los valores que guardamos en su panel
  const SHOP_ID = process.env.PRINTIFY_SHOP_ID;
  const TOKEN = process.env.PRINTIFY_TOKEN;

  // Cabeceras de seguridad CORS indispensables para que GitHub Pages pueda leer los datos
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  // Responder de inmediato si el navegador envía una petición de verificación previa (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    // Consulta directa a la API de Printify en el backend
    const response = await fetch(`https://printify.com{SHOP_ID}/products.json`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${TOKEN}`,
        'User-Agent': 'ReniverseShopApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Printify respondió con código de estado: ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Error en la función serverless:", error);
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
