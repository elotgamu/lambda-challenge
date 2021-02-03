module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
  return callback(null, response);
};
