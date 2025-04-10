"use server";

import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

// Simple in-memory session store
const sessions = new Map();

export async function loginUser(phone: string, pin: string) {
  // Validate 11-digit phone number
  if (!/^\d{11}$/.test(phone)) {
    return { error: "Phone number must be 11 digits" };
  }

  // Validate PIN (4-6 digits)
  if (!/^\d{4,6}$/.test(pin)) {
    return { error: "PIN must be 4-6 digits" };
  }

  const sessionId = `sess_${Math.random().toString(36).substring(2)}`;
  const sessionData = {
    sessionId,
    phoneNumber: phone,
  };

  sessions.set(sessionId, sessionData);

  return new NextResponse(null, {
    headers: {
      "Set-Cookie": `auth-session=${encodeURIComponent(
        JSON.stringify(sessionData)
      )}; Path=/; HttpOnly; SameSite=Lax; Secure=${
        process.env.NODE_ENV === "production"
      }; Max-Age=604800`,
    },
  });
}

export async function checkAuthSession(request: Request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const sessionMatch = cookieHeader.match(/auth-session=([^;]+)/);

  if (!sessionMatch || !sessionMatch[1]) return null;

  try {
    return JSON.parse(decodeURIComponent(sessionMatch[1]));
  } catch {
    return null;
  }
}

export async function logoutUser() {
  const response = new NextResponse(null, {
    headers: {
      "Set-Cookie":
        "auth-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  });
  redirect("/login");
  return response;
}
