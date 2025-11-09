import { apiClient } from "@/lib/apiClient";

export interface SuperAdminLoginInput {
  email: string;
  password: string;
}
export interface SuperAdminLoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export const superAdminLoginApi = async (payload: SuperAdminLoginInput) => {
  const { data } = await apiClient.post<SuperAdminLoginResponse>(
    "/api/auth/super-admin/login",
    payload
  );
  return data;
};
