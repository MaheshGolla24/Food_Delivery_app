const BACKEND_BASE_URL = "http://127.0.0.1:8001/api/auth";

type RouteParams = {
  path?: string[];
};

const proxyRequest = async (request: Request, params: RouteParams) => {
  try {
    const path = params.path?.join("/") ?? "";
    const targetUrl = new URL(`${BACKEND_BASE_URL}/${path}`);
    targetUrl.search = new URL(request.url).search;

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("content-length");

    const init: RequestInit = {
      method: request.method,
      headers,
    };

    if (!["GET", "HEAD"].includes(request.method)) {
      init.body = await request.text();
    }

    const response = await fetch(targetUrl, init);
    const body = await response.arrayBuffer();
    const responseHeaders = new Headers();
    const contentType = response.headers.get("content-type");

    if (contentType) {
      responseHeaders.set("content-type", contentType);
    }

    return new Response(body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      {
        error: "Auth service is unavailable. Please ensure it is running and try again.",
      },
      { status: 503 },
    );
  }
};

export const GET = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);
export const POST = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);
export const PUT = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);
export const PATCH = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);
export const DELETE = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);
export const OPTIONS = (_request: Request, context: { params: RouteParams }) => proxyRequest(_request, context.params);