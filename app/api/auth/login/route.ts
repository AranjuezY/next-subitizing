import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/tools";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth')?.value;

  if (!authToken) {
    return NextResponse.json({ error: "Authentication token missing" }, { status: 401 });
  }

  try {
    const decodedData = decodeToken(authToken);
    return NextResponse.json(decodedData);
  } catch (error: unknown) {
    console.error('Invalid token:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}