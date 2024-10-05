import prisma from "@/lib/prisma/prismaClient";
import { PencilIcon } from "lucide-react";
import DeleteReviewForm from "./_components/DeleteReviewForm";
import Link from "next/link";

async function Movie({ params }: { params: { id: string } }) {
  const data = await prisma.movie.findUnique({
    where: {
      id: params.id,
    },
    include: {
      reviews: true,
    },
  });

  if (!data) {
    return <p>Movie not found</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">{data.name}</h2>
        <span className="text-4xl font-bold text-[#6559f5]">
          {data.averageRating ? `${data.averageRating.toFixed(2)}/10` : "N/A"}
        </span>
      </div>

      <div className="space-y-6">
        {data.reviews.length > 0 ? (
          data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[4px]"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-gray-800">{review.comments}</p>
                <span className="text-2xl font-bold text-[#6559f5]">
                  {review.rating}/10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 italic">
                  By: {review.reviewer || "Anonymous"}
                </span>
                <div className="space-x-2 flex items-center">
                  <Link
                    href={`/edit/review/${review.id}`}
                    className="text-gray-600 hover:text-[#6559f5]"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <DeleteReviewForm id={review.id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-800">No reviews yet for this movie.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Movie;
