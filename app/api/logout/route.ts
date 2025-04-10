import { logoutUser } from "@/app/actions/local-login";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await logoutUser();
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
