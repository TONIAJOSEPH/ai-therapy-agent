import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const authHeader = req.headers.get("Authorization");

  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: authHeader,
      },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { mesage: "Server error", error },
      { status: 500 }
    );
  }
}
