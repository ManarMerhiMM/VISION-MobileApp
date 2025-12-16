// Axios API client configured with base URL and bearer token.
import axios from "axios";
import { API_URL } from "../config/env";

export var api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function setApiToken(token: string | null): void {
  if (token) {
    api.defaults.headers.common.Authorization = "Bearer " + token;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}
