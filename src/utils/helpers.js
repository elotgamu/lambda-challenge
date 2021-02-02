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
      throw new Error("radius value is not number");
    }
    radius = parseInt(radiusToCalculate);
  }

  if (!data) {
    throw new Error("Data not provided");
  }

  if (!Array.isArray(data)) {
    throw new Error("Wrong data type");
  }
  const center = { latitude: latitude, longitude: longitude };
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
