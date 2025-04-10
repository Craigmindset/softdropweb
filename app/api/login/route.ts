import { loginUser } from "@/app/actions/local-login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, pin } = await request.json();
    const response = await loginUser(phone, pin);
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
