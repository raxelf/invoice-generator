export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  code: number;
  message: string;
  data: {
    token: string;
  };
};

export type JwtPayload = {
  id: number;
  role: "admin" | "kerani";
  exp: number;
};