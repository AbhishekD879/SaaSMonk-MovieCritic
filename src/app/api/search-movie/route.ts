import prisma from "@/lib/prisma/prismaClient";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  console.log(query);
  // Filter movies by query (case-insensitive)
  const movies = await prisma.movie.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  console.log(movies);

  return NextResponse.json(movies);
}
