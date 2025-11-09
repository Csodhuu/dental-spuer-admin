import { apiClient } from "@/lib/apiClient";

export interface EmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  hospitalId?: string;
}
export interface EmployeeItem extends EmployeeInput {
  id: string;
}

export const listEmployeesApi = async () => {
  const { data } = await apiClient.get<EmployeeItem[]>("/api/employees");
  return data;
};
export const createEmployeeApi = async (payload: EmployeeInput) => {
  const { data } = await apiClient.post<EmployeeItem>("/api/employees/create", payload);
  return data;
};
export const updateEmployeeApi = async (
  id: string,
  payload: Partial<EmployeeInput>
) => {
  const { data } = await apiClient.put<EmployeeItem>(`/api/employees/${id}`, payload);
  return data;
};
export const deleteEmployeeApi = async (id: string) => {
  const { data } = await apiClient.delete<{ success: boolean }>(`/api/employees/${id}`);
  return data;
};
