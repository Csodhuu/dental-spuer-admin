import { useMutation } from "@tanstack/react-query";
import { superAdminLoginApi, SuperAdminLoginInput } from "@/api/auth/superAdmin";
import { setCookie } from "cookies-next";

export const useSuperAdminLogin = () => {
  return useMutation({
    mutationFn: (payload: SuperAdminLoginInput) => superAdminLoginApi(payload),
    onSuccess: (data) => {
      setCookie("adminAccessToken", data.accessToken, { sameSite: "lax" });
    },
  });
};
