// Imports
// ========================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jsonwebtoken from "jsonwebtoken";

// Functions
// ========================================================
/**
 * JWT
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  // Get authorization header
  const authorization = request.headers.get("authorization") as string;

  // Decode jwt
  const decoded = jsonwebtoken.decode(authorization?.split(" ")[1]);

  // Return
  return NextResponse.json(
    {
      data: decoded,
    },
    {
      status: 200,
    }
  );
};
