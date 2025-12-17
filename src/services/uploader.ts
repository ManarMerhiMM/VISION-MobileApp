// Upload helpers: post records every minute + post alerts instantly.
import { api } from "./api";

export type SensorSnapshot = {
  spo2: number;
  heart_rate: number;
  galvanic_skin_resistance: number;
  relative_humidity: number;
};

export type IncomingAlert = {
  type: "Internal" | "External";
  message: string;
};

export async function uploadRecord(snapshot: SensorSnapshot): Promise<void> {
  await api.post("/record", null, {
    params: {
      spo2: snapshot.spo2,
      heart_rate: snapshot.heart_rate,
      galvanic_skin_resistance: snapshot.galvanic_skin_resistance,
      relative_humidity: snapshot.relative_humidity,
    },
  });
}

export async function uploadAlert(alert: IncomingAlert): Promise<void> {
  await api.post("/alert", null, {
    params: {
      type: alert.type,
      message: alert.message,
      status: 0,
    },
  });
}
