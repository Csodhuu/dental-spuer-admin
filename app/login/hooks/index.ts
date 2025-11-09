import { service } from "@/lib/apiClient";

export const login = async (input: { username: string; password: string }) => {
  try {
    const result = await service.post("/api/auth/super-admin/login", input);
    return result.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
