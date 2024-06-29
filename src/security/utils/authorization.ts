import { AxiosHeaders } from "axios";
import { useAuthStore } from "../../store";
import { jwtExpiration } from "./auth";

export const getAuthorizationHeaders = (): AxiosHeaders => {
  const { user, logout } = useAuthStore.getState();
  const headers = new AxiosHeaders();

  if (user && user.access) {
    if(!jwtExpiration(user.access)){
      headers.set("Authorization", `Bearer ${user.access}`);
    }else{
      logout();
    }
  }

  return headers;
};