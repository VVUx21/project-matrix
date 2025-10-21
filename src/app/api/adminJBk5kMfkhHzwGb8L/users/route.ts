import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET() {
  console.log("API endpoint hit: /api/adminJBk5kMfkhHzwGb8L/users");
  try {
    // Fetch all users including their transaction (if any)
    console.log("Attempting to fetch users from database...");
    const usersWithTransactions = await prisma.user.findMany({
      include: {
        transaction: true,
      },
    } as any);

    // Separate paid and unpaid users based on transaction.hasPaid
    const usersWithPayment = usersWithTransactions.filter(
      (u: any) => u.transaction && u.transaction.hasPaid === true
    );
    const usersWithoutPayment = usersWithTransactions.filter(
      (u: any) => !u.transaction || u.transaction.hasPaid !== true
    );

    return NextResponse.json(
      {
        status: "success",
        data: {
          usersWithPayment,
          usersWithoutPayment,
          totalUsers: usersWithTransactions.length,
          paidUsers: usersWithPayment.length,
          unpaidUsers: usersWithoutPayment.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("/api/adminJBk5kMfkhHzwGb8L/users error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch users",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
