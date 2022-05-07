const { get } = require("../utils/requests");
const { FPL_BASE_URL } = require("../utils/constants");

async function getGameWeekPicksWithPlayerDetails(teamId, gameweek) {
  const { active_chip, entry_history, picks } = await getGameWeekPicks(
    teamId,
    gameweek
  );
  console.log("Picks: ", picks);
  return picks;
}

async function getPlayerDetails(playerId) {
  const url = new URL(`${FPL_BASE_URL}/element-summary/${playerId}`);

  return new Promise(async (resolve, reject) => {
    const onSuccess = ({ data }) => {
      resolve(data);
    };
    const onFailure = ({ response }) => {
      reject(response);
    };
    await get(url.href, onSuccess, onFailure);
  });
}

async function getGameWeekPicks(teamId, gameweek) {
  const url = new URL(
    `${FPL_BASE_URL}/entry/${teamId}/event/${gameweek}/picks/`
  );

  return new Promise(async (resolve, reject) => {
    const onSuccess = ({ data }) => {
      resolve(data);
    };
    const onFailure = ({ response }) => {
      reject(response);
    };
    await get(url.href, onSuccess, onFailure);
  });
}

/**
 * @param {Number} teamId
 * @returns
 */
async function getFPLTeamDetails(teamId) {
  const url = new URL(`${FPL_BASE_URL}/entry/${teamId}/`);
  return new Promise(async (resolve, reject) => {
    const onSuccess = ({ data }) => {
      resolve(data);
    };
    const onFailure = ({ response }) => {
      reject(response);
    };
    await get(url.href, onSuccess, onFailure);
  });
}

module.exports = {
  getGameWeekPicksWithPlayerDetails,
  getFPLTeamDetails,
};
