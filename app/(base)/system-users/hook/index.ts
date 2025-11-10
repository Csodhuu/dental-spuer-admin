import { useMutation, useQueryClient } from "@tanstack/react-query";
import { service } from "@/lib/apiClient";
import { USERS_KEY } from "@/utils/react-query-key";

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  phoneNumber: string;
  username: string;
  password: string;
  hospitalId: string;
}

export interface UserItem extends CreateUserInput {
  id: string;
}

export const useCreateUser = ({
  onSuccess,
}: { onSuccess?: (data: UserItem) => void } = {}) => {
  const queryClient = useQueryClient();
  return useMutation<UserItem, Error, CreateUserInput>({
    mutationFn: async (input: CreateUserInput) => {
      const res = await service.post("/api/employees/admin/create", input);
      const data: UserItem = res.data;
      onSuccess?.(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
  });
};
