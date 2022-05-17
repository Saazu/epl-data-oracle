const { get } = require("../utils/requests");
const { FPL_BASE_URL } = require("../utils/constants");

async function getGameWeekPicksWithPlayerDetails(teamId, gameweek) {
  try {
    const { active_chip, entry_history, picks } = await getGameWeekPicks(
      teamId,
      gameweek
    );
    const detailedPicks = picks.map((pick) => getPlayerDetails(pick));
    const gameweekPicks = await Promise.all(detailedPicks);
    // console.log(gameweekPicks);
    return { active_chip, entry_history, picks: gameweekPicks };
  } catch (error) {}
}

async function getPlayerDetails(pick) {
  const url = new URL(`${FPL_BASE_URL}/element-summary/${pick.element}/`);
  return new Promise(async (resolve, reject) => {
    const onSuccess = ({ data }) => {
      resolve({ ...data, ...pick });
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
