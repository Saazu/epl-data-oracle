const functions = require("firebase-functions");
const { getFPLTeamDetails } = require("./fantasyData.helper");

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    const teamId = request.body.data.teamId;
    try {
      const teamData = await getFPLTeamDetails(teamId);
      response.status(200).send(teamData);
    } catch (error) {
      response.status(400).send(error);
    }
  });
