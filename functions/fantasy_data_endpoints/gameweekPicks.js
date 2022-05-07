const functions = require("firebase-functions");
const { getGameWeekPicksWithPlayerDetails } = require("./fantasyData.helper");

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (request, response) => {
    const teamId = request.body.data.teamId;
    const gameweek = request.body.data.gameweek;
    try {
      const teamData = await getGameWeekPicksWithPlayerDetails(
        teamId,
        gameweek
      );
      response.status(200).send(teamData);
    } catch (error) {
      response.status(400).send(error);
    }
  });
