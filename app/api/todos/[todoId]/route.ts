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
 * Read
 * @param request
 * @returns
 */
export const GET = async (
  _request: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const todoId = params.todoId;

  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new Error(`Todo ${todoId} not found.`);
    }

    // Return
    return NextResponse.json(
      {
        data: todo,
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
        status: 404,
      }
    );
  }
};

/**
 * Update
 * @param request
 * @returns
 */
export const PUT = async (
  request: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const todoId = params.todoId;

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

  try {
    const todoUpdate: Prisma.TodoUpdateArgs = {
      where: {
        id: todoId,
      },
      data: payload,
    };

    // Return
    return NextResponse.json(
      {
        data: await prisma.todo.update(todoUpdate),
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
        status: 404,
      }
    );
  }
};

/**
 * Delete
 * @param request
 * @returns
 */
export const DELETE = async (
  _request: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const todoId = params.todoId;

  try {
    const todoDelete: Prisma.TodoDeleteArgs = {
      where: {
        id: todoId,
      },
    };

    // Return
    return NextResponse.json(
      {
        data: await prisma.todo.delete(todoDelete),
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
        status: 404,
      }
    );
  }
};
