// Imports
// ========================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Functions
// ========================================================
/**
 * Basic Auth
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  // Get authorization header
  const authorization = request.headers.get("authorization") as string;

  // Decode authorization header as base64
  const buff = Buffer.from(authorization?.split(" ")[1], "base64");
  const text = buff.toString("utf-8");

  // Return
  return NextResponse.json(
    {
      data: text,
    },
    {
      status: 200,
    }
  );
};
