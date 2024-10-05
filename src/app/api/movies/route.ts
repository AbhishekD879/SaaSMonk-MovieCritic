// pages/api/movies.js
import prisma from "@/lib/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "";
  const limit = searchParams.get("limit") || "";
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  const movies = await prisma.movie.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });
  return NextResponse.json(movies);
}
