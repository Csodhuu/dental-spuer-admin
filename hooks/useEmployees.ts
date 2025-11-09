import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  EmployeeInput,
} from "@/api/employees";

const qk = { list: ["employees", "list"] as const };

export const useEmployees = () => useQuery({ queryKey: qk.list, queryFn: listEmployeesApi });

export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: EmployeeInput) => createEmployeeApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<EmployeeInput> }) =>
      updateEmployeeApi(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployeeApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};
