/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { service } from "@/lib/apiClient";
import { HOSPITALS_KEY } from "@/utils/react-query-key";

export interface HospitalForm {
  name: string;
  registrationNumber: string;
  address: string;
  phoneNumber: string;
  logo: string;
  _id?: string;
}

export const useGetHospital = () => {
  return useQuery({
    queryKey: [HOSPITALS_KEY],
    queryFn: async () => {
      const res = await service.get(`/api/hospitals/list`);
      return res.data as HospitalForm[];
    },
  });
};
export const useCreateHospital = ({
  onSuccess,
}: { onSuccess?: (data: any) => void } = {}) => {
  const queryClient = useQueryClient();
  return useMutation<HospitalForm, Error, HospitalForm>({
    mutationFn: async (input: HospitalForm) => {
      const res = await service.post(`/api/hospitals/create`, input);
      const data: HospitalForm = res.data;
      onSuccess?.(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HOSPITALS_KEY] });
    },
  });
};

export const useDeleteHospital = ({
  onSuccess,
}: {
  onSuccess: (data: HospitalForm) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await service.delete(`/api/hospitals/delete/${id}`);
      const data = res.data;
      onSuccess(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HOSPITALS_KEY],
      });
    },
  });
};
