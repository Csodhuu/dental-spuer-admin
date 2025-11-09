import { apiClient } from "@/lib/apiClient";

export interface EmployeeAdminInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  hospitalId?: string;
}
export interface EmployeeAdminItem extends Omit<EmployeeAdminInput, "password"> {
  id: string;
}

export const listAdminEmployeesApi = async () => {
  const { data } = await apiClient.get<EmployeeAdminItem[]>("/api/employees/admin");
  return data;
};
export const createAdminEmployeeApi = async (payload: EmployeeAdminInput) => {
  const { data } = await apiClient.post<EmployeeAdminItem>(
    "/api/employees/admin/create",
    payload
  );
  return data;
};
export const updateAdminEmployeeApi = async (
  id: string,
  payload: Partial<EmployeeAdminInput>
) => {
  const { data } = await apiClient.put<EmployeeAdminItem>(`/api/employees/admin/${id}`, payload);
  return data;
};
export const deleteAdminEmployeeApi = async (id: string) => {
  const { data } = await apiClient.delete<{ success: boolean }>(`/api/employees/admin/${id}`);
  return data;
};
