const functions = require("firebase-functions");

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  });
