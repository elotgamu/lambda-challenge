const { insideCircle } = require("geolocation-utils");
/**
 * [filterByPrimaryCity description]
 *
 * @param   {Array}  data          Array to filter
 * @param   {string}  primary_city  the primary city to filter
 *
 * @return  {Array}
 */
const filterByPrimaryCity = ({ data, primary_city }) => {
  if (!data) {
    throw new Error("Data not provided");
  }

  if (!Array.isArray(data)) {
    throw new Error("Wrong data type");
  }

  if (!primary_city || primary_city === "") {
    throw new Error("No primary city provided");
  }

  return data.filter((item) => item.primary_city.includes(primary_city));
};

/**
 * [filterByTimeZone description]
 *
 * @param   {Array}  data      [data description]
 * @param   {string}  timeZone  [timeZone description]
 *
 * @return  {Array}            [return description]
 */
const filterByTimeZone = ({ data, timeZone }) => {
  if (!data) {
    throw new Error("Data not provided");
  }

  if (!Array.isArray(data)) {
    throw new Error("Wrong data type");
  }

  if (!timeZone || timeZone === "") {
    throw new Error("No timezone provided");
  }

  return data.filter((item) => item.timezone === timeZone);
};

/**
 * [filterByState description]
 *
 * @param   {Array}  data   [data description]
 * @param   {string}  state  [state description]
 *
 * @return  {Array}         [return description]
 */
const filterByState = ({ data, state }) => {
  if (!data) {
    throw new Error("Data not provided");
  }

  if (!Array.isArray(data)) {
    throw new Error("Wrong data type");
  }

  if (!state || state === "") {
    throw new Error("No state provided");
  }

  return data.filter((item) => item.state === state);
};

/**
 * [filterClosestLocations description]
 * @param {Array} data
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} radiusToCalculate
 * @return  {Array}  [return description]
 */
const filterClosestLocations = ({
  data,
  latitude,
  longitude,
  radiusToCalculate,
}) => {
  let radius = 10000;

  if (radiusToCalculate) {
    if (isNaN(radiusToCalculate)) {
      throw new Error("Radius value is not number");
    }
    radius = parseInt(radiusToCalculate);
  }

  if (!data) {
    throw new Error("Data not provided");
  }

  if (!Array.isArray(data)) {
    throw new Error("Wrong data type");
  }

  if (!latitude) {
    throw new Error("No latitude provided");
  }

  if (isNaN(latitude)) {
    throw new Error("Latitude should be a number");
  }

  if (!longitude) {
    throw new Error("No longitude provided");
  }

  if (isNaN(longitude)) {
    throw new Error("Longitude should be a number");
  }
  const center = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };
  return data.filter((item) =>
    insideCircle(
      {
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      },
      center,
      radius
    )
  );
};

module.exports = {
  filterByTimeZone,
  filterByPrimaryCity,
  filterByState,
  filterClosestLocations,
};
