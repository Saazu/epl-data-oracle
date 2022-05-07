const admin = require("firebase-admin");
const serviceAccount = require("./chainlink-hackathon-1ecb8-firebase-adminsdk-hchdi-910ebe5075.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://",
});

exports.teamDetails = require("./fantasy_data_endpoints/teamDetails");

exports.gameWeekPicks = require("./fantasy_data_endpoints/gameweekPicks");

exports.allHistoricalPicks = require("./fantasy_data_endpoints/allhistoricalPicks");
