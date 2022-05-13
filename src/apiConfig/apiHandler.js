import axios from "axios";
import { default as Endpoints } from "./apiEndPoints";

export const performRequest = async (method, url, data) => {
  url = url.replaceAll("#", "%23");
  const config = {
    method,
    url,
  };
  if (
    method === Endpoints.methodType.PUT ||
    method === Endpoints.methodType.PATCH ||
    method === Endpoints.methodType.POST
  ) {
    config.data = data;
  }
  if (method === Endpoints.methodType.GET) {
    config.params = data;
  }
  config.headers = {
    "Content-Type": "application/json; charset=utf-8",
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': true,
  };

  return axios.request(config);
};
