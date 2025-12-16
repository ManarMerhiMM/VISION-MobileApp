// Auth API: login returns token only, then fetch user using /me, logout deletes the token.
import { api, setApiToken } from "./api";

export type User = {
  id: number;
  username: string;
  email?: string;
};

export type LoginResult = {
  token: string;
};

export async function login(username: string, password: string): Promise<LoginResult> {
  var res = await api.post("/login", { username, password });

  var token: string = res.data?.token;

  setApiToken(token);

  return { token: token };
}

export async function me(): Promise<User> {
  var res = await api.get("/me");
  return res.data as User;
}

export async function logout(): Promise<void> {
  // Laravel API usually expects POST /logout with Bearer token
  await api.post("/logout");
  setApiToken(null);
}