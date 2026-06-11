import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const handler = auth.handler();

export async function GET(
  request: NextRequest,
  context: { params: Promise<Record<string, string[] | undefined>> }
) {
  const resolvedParams = await context.params;
  const arrayVal = resolvedParams ? (resolvedParams.auth || resolvedParams.path || resolvedParams.all || []) : [];
  const mockParams = {
    auth: arrayVal,
    path: arrayVal,
    all: arrayVal
  };
  const response = await handler.GET(request, { params: Promise.resolve(mockParams) });

  if (arrayVal.includes("sign-out")) {
    const newHeaders = new Headers(response.headers);
    const deleteCookies = [
      "neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Secure-neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Secure-neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Host-neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Host-neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax"
    ];
    for (const cookie of deleteCookies) {
      newHeaders.append("Set-Cookie", cookie);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<Record<string, string[] | undefined>> }
) {
  const resolvedParams = await context.params;
  const arrayVal = resolvedParams ? (resolvedParams.auth || resolvedParams.path || resolvedParams.all || []) : [];
  const mockParams = {
    auth: arrayVal,
    path: arrayVal,
    all: arrayVal
  };
  const response = await handler.POST(request, { params: Promise.resolve(mockParams) });

  if (arrayVal.includes("sign-out")) {
    const newHeaders = new Headers(response.headers);
    const deleteCookies = [
      "neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Secure-neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Secure-neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Host-neon_auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
      "__Host-neon_auth.session_data=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax"
    ];
    for (const cookie of deleteCookies) {
      newHeaders.append("Set-Cookie", cookie);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}
