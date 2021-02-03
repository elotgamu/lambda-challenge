const {
  filterByPrimaryCity,
  filterByTimeZone,
  filterByState,
  filterClosestLocations,
  filterByZipCode,
} = require("../../src/utils/helpers");
const data = require("../../src/data.json");

describe("Filter by zip code", () => {
  test("Filter by zipcode exists", () => {
    expect(typeof filterByZipCode).toBe("function");
  });

  test("filter by zipcode throws error when no data is provided", () => {
    const response = () => filterByZipCode({});
    expect(response).toThrowError();
  });

  test("filter by zip code to throw error when no zipcode is provided", () => {
    const response = () => filterByZipCode({ data: data });
    console.log(response);
    expect(response).toThrowError("Zipcode not provided");
  });

  test("filter by zipcode should return no result on non existing zipcode in data", () => {
    // a zip code from CABA - Argentina
    const response = filterByZipCode({ data: data, zipCode: "B1675" });
    expect(response.length).toBe(0);
  });

  test("filter by zipcode should return result on existing zipcode in data", () => {
    const response = filterByZipCode({ data: data, zipCode: "01003" });
    expect(response.length).toBe(1);
  });

  test("filter by zipcode should return result on partial coincidence of a zipcode", () => {
    const response = filterByZipCode({ data: data, zipCode: "015" });
    expect(response.length).toBeGreaterThan(0);
  });
});

describe("Filter by Primary city", () => {
  test("filter by primary city exists", () => {
    expect(typeof filterByPrimaryCity).toBe("function");
  });

  test("filter by primary city throws error when no param is passed", () => {
    const response = () => filterByPrimaryCity({});
    expect(response).toThrow(Error);
  });

  test("filter by primary city throws and error when no data is passed", () => {
    const response = () =>
      filterByPrimaryCity({ data: null, primary_city: "Bo" });
    expect(response).toThrowError("Data not provided");
  });
  test("filter by primary city throws error when data is not an array", () => {
    const response = () =>
      filterByPrimaryCity({ data: {}, primary_city: "Bo" });
    expect(response).toThrowError("Wrong data type");
  });
  test("filter by primary city throws error when no primary_city is provided", () => {
    const response = () => filterByPrimaryCity({ data: data });
    expect(response).toThrowError("No primary city provided");
  });

  test("filter by primary city return results", () => {
    const primary_city = "Moultonborough";
    const response = filterByPrimaryCity({
      data: data,
      primary_city: primary_city,
    });
    expect(response.length).toBeGreaterThan(0);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          primary_city: primary_city,
        }),
      ])
    );
  });
});

describe("Filter by timezone", () => {
  test("filter by timezone exists", () => {
    expect(typeof filterByTimeZone).toBe("function");
  });

  test("filter by timezone throws error when no param is passed", () => {
    const zipByTimezone = () => filterByTimeZone({});
    expect(zipByTimezone).toThrow(Error);
  });

  test("filter by timezone throws error when no data is provided", () => {
    const timeZone = "America/New_York";
    const zipByTimeZone = () => filterByTimeZone({ timeZone });
    expect(zipByTimeZone).toThrowError("Data not provided");
  });

  test("filter by timezone throws error when no data is not an array", () => {
    const timeZone = "America/New_York";
    const zipByTimeZone = () => filterByTimeZone({ data: {}, timeZone });
    expect(zipByTimeZone).toThrowError("Wrong data type");
  });

  test("filter by timezone throws error when no timeZone is provided", () => {
    const zipByTimeZone = () => filterByTimeZone({ data: data });
    expect(zipByTimeZone).toThrowError("No timezone provided");
  });

  test("filter by timezone return results", () => {
    const timeZone = "America/New_York";
    const response = filterByTimeZone({ data: data, timeZone: timeZone });
    expect(response.length).toBeGreaterThan(0);
  });

  test("filter by timezone return no result on non existing timezone in the data provided", () => {
    const timeZone = "America/Anchorage";
    const response = filterByTimeZone({ data: data, timeZone: timeZone });
    expect(response.length).toBe(0);
  });
});

describe("Filter by state", () => {
  test("filter by state exists", () => {
    expect(typeof filterByState).toBe("function");
  });

  test("filter by state throws error when no param is passed", () => {
    const zipByState = () => filterByState({});
    expect(zipByState).toThrow(Error);
  });

  test("filter by state throws error when no data is provided", () => {
    const state = "CT";
    const zipByState = () => filterByState({ state });
    expect(zipByState).toThrowError("Data not provided");
  });

  test("filter by state throws error when no data is not an array", () => {
    const state = "CT";
    const zipByState = () => filterByState({ data: {}, state });
    expect(zipByState).toThrowError("Wrong data type");
  });

  test("filter by state throws error when no state is provided", () => {
    const zipByState = () => filterByState({ data: data });
    expect(zipByState).toThrowError("No state provided");
  });

  test("filter by state return results when state exists", () => {
    const state = "CT";
    const zipByState = filterByState({ data: data, state: state });
    expect(zipByState.length).toBeGreaterThan(0);
  });
  test("filter by state return no result when state not in data provided", () => {
    // retrieve ALABAMA (which we know it is not in the data set)
    const zipByState = filterByState({
      data: data,
      state: "AL",
    });
    expect(zipByState.length).toBe(0);
  });
});

describe("Filter by closest locations", () => {
  test("filterByClosestLocations exists", () => {
    expect(typeof filterClosestLocations).toBe("function");
  });

  test("filter closest locations throws error when no data is passed", () => {
    const response = () => filterClosestLocations({});
    expect(response).toThrowError();
  });

  test("filter closest locations throws error when latitude is not provided", () => {
    const longitude = -72.61;
    const response = () =>
      filterClosestLocations({ data: data, longitude: longitude });
    expect(response).toThrowError("No latitude provided");
  });

  test("filter closest locations throws error when latitude is not a number", () => {
    const longitude = -72.61;
    const latitude = "test";
    const response = () =>
      filterClosestLocations({
        data: data,
        latitude: latitude,
        longitude: longitude,
      });
    expect(response).toThrowError("Latitude should be a number");
  });

  test("filter closest locations throws error when longitude is not provided", () => {
    const latitude = 42.06;
    const response = () =>
      filterClosestLocations({ data: data, latitude: latitude });
    expect(response).toThrowError("No longitude provided");
  });

  test("filter closest locations throws error when longitude is not a number", () => {
    const longitude = "test";
    const latitude = 42.06;
    const response = () =>
      filterClosestLocations({
        data: data,
        latitude: latitude,
        longitude: longitude,
      });
    expect(response).toThrowError("Longitude should be a number");
  });

  test("filter closest location throws error when radius is not a number", () => {
    const longitude = -72.61;
    const latitude = 42.06;
    const radius = "test";
    const response = () =>
      filterClosestLocations({
        data: data,
        latitude: latitude,
        longitude: longitude,
        radiusToCalculate: radius,
      });
    expect(response).toThrowError("Radius value is not number");
  });

  test("filter closest location should return zip codes near 10km when no radius is provided", () => {
    const longitude = -72.61;
    const latitude = 42.06;
    const response = filterClosestLocations({
      data: data,
      longitude: longitude,
      latitude: latitude,
    });
    expect(response.length).toBeGreaterThan(0);
  });

  test("filter closest location should return zip codes near the indicated radius", () => {
    const longitude = -72.61;
    const latitude = 42.06;
    const radius = 5000;
    const response = filterClosestLocations({
      data: data,
      longitude: longitude,
      latitude: latitude,
      radiusToCalculate: radius,
    });
    expect(response.length).toBeGreaterThan(0);
  });

  test("filter by closest location should return no result for a location outside the US", () => {
    // Setup CABA - Argentina location
    const latitude = -34.603722;
    const longitude = -58.381592;
    const response = filterClosestLocations({
      data: data,
      longitude: longitude,
      latitude: latitude,
    });
    expect(response.length).toBe(0);
  });
});
