export type HttpResponse<T = Record<string, any>> = {
    success: boolean;
    message?: string;
    data?: T;
  };