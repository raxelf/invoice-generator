export type ResponseType<T> = {
  code: number;
  message?: string;
  data?: T;
};

export type ErrorResponse = {
  message: string;
};