import {
  CALENDAR_CONNECTION_LABEL,
  CALENDAR_CONNNECTION_ID,
  descopeClient,
} from "../config/descope.js";
import {
  getCalendarConnectionRow,
  upsertCalendarConnection,
} from "../repositories/connection.repositories.js";

function calendarAppId() {
  if (!CALENDAR_CONNNECTION_ID) {
    throw new Error("CALENDAR_CONNNECTION_ID is not defined");
  }
  return CALENDAR_CONNNECTION_ID;
}

export async function getCalendarConnection(userId: string) {
  const row = await getCalendarConnectionRow(userId);

  return {
    label: CALENDAR_CONNECTION_LABEL,
    status: row?.status ?? ("disconnected" as const),
  };
}

export async function createCalendarConnectionUrl(input: {
  userId: string;
  refreshToken: string;
  redirectUrl: string;
}) {
  const response = await descopeClient.outbound.connect(
    calendarAppId(),
    {
      redirectUrl: input.redirectUrl,
    },
    input.refreshToken,
  );

  if (!response.ok || !response.data?.url) {
    throw new Error("Could not start connection");
  }

  await upsertCalendarConnection({ userId: input.userId, status: "pending" });

  return {
    url: response.data.url,
  };
}

export async function refreshConnectionStatus(input: {
  userId: string;
  authUserId: string;
}) {
  if (!process.env.DESCOPE_MANAGEMENT_KEY) {
    throw new Error("DESCOPE_MANAGEMENT_KEY is not defined");
  }

  const response =
    await descopeClient.management.outboundApplication.fetchToken(
      calendarAppId(),
      input.authUserId,
    );

  const status = response.ok && response.data ? "connected" : "disconnected";

  const row = await upsertCalendarConnection({
    userId: input.userId,
    status,
  });

  return {
    label: CALENDAR_CONNECTION_LABEL,
    status: row.status,
  };
}
