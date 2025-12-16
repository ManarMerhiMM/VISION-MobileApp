// AsyncStorage helpers for authentication token persistence.
import AsyncStorage from "@react-native-async-storage/async-storage";

var TOKEN_KEY: string = "auth_token";

export async function saveToken(token: string): Promise<void> {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  var token = await AsyncStorage.getItem(TOKEN_KEY);
  return token;
}

export async function clearToken(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
