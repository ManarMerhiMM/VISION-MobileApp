// App environment config (API base URL).
import { API_URL as ENV_API_URL } from "@env";
import { FRONTEND_URL as ENV_FRONTEND_URL } from "@env";

export var API_URL: string =
  ENV_API_URL ?? "http://10.0.2.2:8000/api";

export var FRONTEND_URL: string =
  ENV_FRONTEND_URL ?? "http://10.0.2.2:5173";
