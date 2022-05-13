import { performRequest } from "apiConfig/apiHandler";
import { default as apiEndPoints } from "apiConfig/apiEndPoints";

export const getUsers = () => {
  let url = apiEndPoints.usersEndPoint;
  return performRequest(apiEndPoints.methodType.GET, url);
};
