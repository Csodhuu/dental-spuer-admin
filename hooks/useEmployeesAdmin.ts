import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listAdminEmployeesApi,
  createAdminEmployeeApi,
  updateAdminEmployeeApi,
  deleteAdminEmployeeApi,
  EmployeeAdminInput,
} from "@/api/employeesAdmin";

const qk = { list: ["admin-employees", "list"] as const };

export const useAdminEmployees = () =>
  useQuery({ queryKey: qk.list, queryFn: listAdminEmployeesApi });

export const useCreateAdminEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: EmployeeAdminInput) => createAdminEmployeeApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useUpdateAdminEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<EmployeeAdminInput> }) =>
      updateAdminEmployeeApi(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useDeleteAdminEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminEmployeeApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};
