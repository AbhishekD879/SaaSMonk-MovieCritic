// File: /app/api/reviews/route.js
import prisma from "@/lib/prisma/prismaClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  try {
    const reviews = await prisma.review.findMany({
      where: {
        OR: [
          {
            comments: {
              contains: search,
              mode: "insensitive", // case insensitive search
            },
          },
          {
            reviewer: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return new Response(JSON.stringify({ reviews }), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}
