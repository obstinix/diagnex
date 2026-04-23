const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

exports.handler = async (event, context) => {
  return { 
    statusCode: 200, 
    headers, 
    body: JSON.stringify({ status: "ok", timestamp: Date.now() }) 
  };
};
