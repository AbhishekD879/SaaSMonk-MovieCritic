import prisma from "@/lib/prisma/prismaClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditMovieForm from "./_components/EditMovieForm";

export const dynamic = "force-dynamic";

export default async function EditMovie({
  params,
}: {
  params: { id: string };
}) {
  const data: Movie = (await prisma.movie.findUnique({
    where: {
      id: params.id,
    },
  })) as Movie;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 !text-black">
      <Link href="/">
        <button className="flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movie Details
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Edit Movie : {data?.name}</h1>
      <EditMovieForm movie={data} />
    </div>
  );
}
