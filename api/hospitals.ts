import { apiClient } from "@/lib/apiClient";

export interface HospitalInput {
  name: string;
  address: string;
  phoneNumber: string;
}
export interface HospitalItem extends HospitalInput {
  id: string;
}

export const listHospitalsApi = async () => {
  const { data } = await apiClient.get<HospitalItem[]>("/api/hospitals");
  return data;
};
export const createHospitalApi = async (payload: HospitalInput) => {
  const { data } = await apiClient.post<HospitalItem>("/api/hospitals/create", payload);
  return data;
};
export const updateHospitalApi = async (id: string, payload: HospitalInput) => {
  const { data } = await apiClient.put<HospitalItem>(`/api/hospitals/${id}`, payload);
  return data;
};
export const deleteHospitalApi = async (id: string) => {
  const { data } = await apiClient.delete<{ success: boolean }>(`/api/hospitals/${id}`);
  return data;
};
