import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Middleware to calculate and update average rating for a movie after review actions
prisma.$use(async (params, next) => {
  let movieId: string | null | undefined = null;

  // Check if the action is related to creating, updating, or deleting a review
  if (
    params.model === "Review" &&
    ["create", "update", "delete"].includes(params.action)
  ) {
    if (params.action === "create" || params.action === "update") {
      movieId = params.args.data.movieId;
    } else if (params.action === "delete") {
      // Retrieve the review before deleting to access the movieId
      const deletedReview = await prisma.review.findUnique({
        where: params.args.where,
      });
      movieId = deletedReview?.movieId;
    }
  }

  // Proceed with the actual operation (create, update, delete)
  const result = await next(params);

  if (movieId) {
    // Recalculate the average rating for the movie
    const updatedRating = await recalculateAverageRating(movieId);

    // Update the Movie's average rating in the database
    await prisma.movie.update({
      where: { id: movieId },
      data: { averageRating: updatedRating },
    });
  }

  return result;
});

// Function to calculate the average rating for a movie
async function recalculateAverageRating(movieId: string) {
  const reviews = await prisma.review.findMany({
    where: { movieId },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    return null; // If no reviews exist, return null
  }

  // Calculate the average rating
  const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  return averageRating;
}

export default prisma;
