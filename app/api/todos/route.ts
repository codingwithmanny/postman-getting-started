// Imports
// ========================================================
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

// Config
// ========================================================
const prisma = new PrismaClient();

// Functions
// ========================================================
/**
 * List
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") as string;
  const limit = parseInt(searchParams.get("limit") as string, 0) || 10;
  const offset = parseInt(searchParams.get("offset") as string, 0) || 0;
  const order = ["id", "userId", "todo", "isComplete", "createdAt"].includes(
    searchParams.get("order") as string
  )
    ? (searchParams.get("order") as string)
    : "id";
  const sort = ["asc", "desc"].includes(searchParams.get("sort") as string)
    ? (searchParams.get("sort") as string)
    : "asc";

  // Query
  let todoFindMany: Prisma.TodoFindManyArgs = {};

  // Find
  if (search) {
    todoFindMany.where = {
      task: {
        contains: search,
      },
    }
  }

  // Limit
  todoFindMany.take = limit;

  // Offset
  todoFindMany.skip = offset;

  // Sort
  todoFindMany.orderBy = {
    [order]: sort,
  };

  // Return
  return NextResponse.json(
    {
      data: await prisma.todo.findMany(),
    },
    {
      status: 200,
    }
  );
};

/**
 * Create
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
  // Validate Content Type
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      {
        message: `Invalid 'Content-Type' header, expected 'application/json'.`,
      },
      {
        status: 400,
      }
    );
  }

  // Get Payload
  const payload = await request.json();

  // Validation
  if (!payload.task) {
    return NextResponse.json(
      {
        message: `Valid 'todo' required.`,
      },
      {
        status: 422,
      }
    );
  }

  // Query
  try {
    const todoCreate: Prisma.TodoCreateArgs = {
      data: payload
    };

    // Success
    return NextResponse.json(
      {
        data: await prisma.todo.create(todoCreate),
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Failure
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
