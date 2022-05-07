const axios = require("axios");

const defaultOptions = {};

/**
 * @param {String} url
 * @param {Function} succeed
 * @param {Function} fail
 * @param {Object} options
 */
async function get(url, succeed, fail, options) {
  try {
    const response = await axios.get(url, {
      ...defaultOptions,
      ...options,
    });
    succeed(response);
  } catch (error) {
    fail(error);
  }
}

/**
 * @param {String} url
 * @param {Function} succeed
 * @param {Function} fail
 * @param {Object} options
 */
async function post(url, succeed, fail, options) {
  const { data, ...rest } = options;

  try {
    const response = await axios.post(url, data, {
      ...defaultOptions,
      ...rest,
    });
    succeed(response);
  } catch (error) {
    fail(error);
  }
}

module.exports = {
  get,
  post,
};
