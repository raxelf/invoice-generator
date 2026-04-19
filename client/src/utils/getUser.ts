import Cookies from "js-cookie";
import { JwtPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

// for getting user roles from jwt token
export const getUser = (): JwtPayload | null => {
  const token = Cookies.get("token");

  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};
