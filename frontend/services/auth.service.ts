const BASE_URL = "/api/auth";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access?: string;
  detail?: string;
  error?: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  role: string;
};

export type RegisterResponse = {
  message?: string;
  detail?: string;
  error?: string;
  username?: string[];
  password?: string[];
  role?: string[];
  non_field_errors?: string[];
};

const parseResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const parsed = (await res.json()) as Record<string, unknown>;
      return ({ ...parsed, status: res.status } as T);
    } catch {
      return ({ error: "Unexpected server response", status: res.status } as T);
    }
  }

  if (!res.ok) {
    return ({ error: "Request failed. Please try again.", status: res.status } as T);
  }

  return ({ status: res.status } as T);
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseResponse<LoginResponse>(res);
};



export const register = async (data: any) => {
  const res = await fetch(`${BASE_URL}/register/`, {  // ✅ slash added
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};