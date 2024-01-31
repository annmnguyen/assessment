/**
 * This file can be used to store global variables that you need to access across multiple places.
 * We've put a few here that we know you will need.
 * Fill in the blank for each one
 */

// I went to syntax and snacks to get help for this code.

export const MY_BU_ID = "U92480755";
export const BASE_API_URL = "https://spark-se-assessment-api.azurewebsites.net/api";
// You can get this from Gradescope aka x-functions-key
export const TOKEN = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
// This is a helper function to generate the headers with the x-functions-key attached
export const GET_DEFAULT_HEADERS = () => {
  var headers = new Headers();
  // You will need to add another header here
  headers.append("x-functions-key", TOKEN);
  // If you do not, the API will reject your request (:
  return headers;
};

