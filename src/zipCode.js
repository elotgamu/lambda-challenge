const data = require("./data.json");
const {
  filterByPrimaryCity,
  filterByState,
  filterByTimeZone,
  filterClosestLocations,
} = require("./utils/helpers");

// lambda-like handler function
module.exports.handler = async (event, context, callback) => {
  try {
    // do stuff...
    const query = event.queryStringParameters;

    // If NO query params we return the whole set of zip data
    if (!query || query.length === 0) {
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ result: data }),
        });
      });
    }

    if (query.zipCode) {
      const zipCodes = data.filter((item) => item.zip.includes(query.zipCode));
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({
            results: zipCodes,
          }),
        });
      });
    }

    if (query.primary_city) {
      const zipCodesForCity = filterByPrimaryCity({
        data: data,
        primary_city: query.primary_city,
      });
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ results: zipCodesForCity }),
        });
      });
    }

    if (query.state) {
      const zipByStates = filterByState({ data, state: query.state });
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ results: zipByStates }),
        });
      });
    }

    if (query.timezone) {
      const zipByTimeZone = filterByTimeZone({
        data: data,
        timeZone: query.timezone,
      });
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ results: zipByTimeZone }),
        });
      });
    }

    if (query.latitude && query.longitude) {
      const closestLocations = filterClosestLocations({
        data: data,
        latitude: parseFloat(query.latitude),
        longitude: parseFloat(query.longitude),
        radiusToCalculate: query.radius || 10000,
      });
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ results: closestLocations }),
        });
      });
    }

    return new Promise((resolve) => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({
          results: [],
          message: "No key query params to filter",
        }),
      });
    });
  } catch (error) {
    return new Promise((reject) => {
      reject(error);
    });
  }
};
