const items = require("./items.json");

exports.getProductsList = async function (event, context) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(items),
  };
};

exports.getProductsById = async function (event, context) {
  const { productId } = event.pathParameters;

  const item = items.find((i) => i.id === productId);

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
