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

module.exports = {
  filterByTimeZone,
  filterByPrimaryCity,
  filterByState,
};
