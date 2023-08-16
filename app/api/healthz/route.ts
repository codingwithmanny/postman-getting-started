// Imports
// ========================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Functions
// ========================================================
/**
 * Healthz
 * @param request
 * @returns
 */
export const GET = async (_request: NextRequest) => {
  // Set cookie
  cookies().set({
    name: "Hello",
    value: "There",
    httpOnly: true,
    path: "/",
  });

  // Return
  return NextResponse.json(
    {
      data: true,
    },
    {
      status: 200,
    }
  );
};