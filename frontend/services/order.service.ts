const BASE_URL = "/api/orders";

export type OrderItem = {
  [key: string]: unknown;
};

export type CreateOrderRequest = {
  restaurant_id: number;
  items: OrderItem[];
  total_price: number;
};

export type ApiResponse = {
  error?: string;
  detail?: string;
  [key: string]: unknown;
};

const parseResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  const text = await res.text();
  return ({ detail: text } as T);
};

export const createOrder = async (data: CreateOrderRequest, token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return parseResponse<ApiResponse>(res);
};

export const getOrders = async (token: string): Promise<ApiResponse> => {
  const res = await fetch(`${BASE_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseResponse<ApiResponse>(res);
};