import { getToken } from "@/store/auth.store";

export const useAuth = () => {
  const token = getToken();

  return {
    isAuthenticated: !!token,
    token,
  };
};