import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listHospitalsApi,
  createHospitalApi,
  updateHospitalApi,
  deleteHospitalApi,
  HospitalInput,
} from "@/api/hospitals";

const qk = { list: ["hospitals", "list"] as const };

export const useHospitals = () => useQuery({ queryKey: qk.list, queryFn: listHospitalsApi });

export const useCreateHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: HospitalInput) => createHospitalApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useUpdateHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: HospitalInput }) =>
      updateHospitalApi(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};

export const useDeleteHospital = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteHospitalApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.list }),
  });
};
