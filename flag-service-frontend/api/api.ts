const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface FlagResponse {
  status: string;
}

export const getFlag = async (flagName: string): Promise<FlagResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/flags/${flagName}`);
  return response.json();
};

export const reloadFlags = async (
  username: string,
  password: string
): Promise<boolean> => {
  const credentials = btoa(`${username}:${password}`);
  const response = await fetch(`${API_BASE_URL}/api/admin/flags/reload`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
  return response.ok;
};
