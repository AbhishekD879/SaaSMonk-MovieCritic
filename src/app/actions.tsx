"use server";
import movieSchema from "../lib/_definations/addMovie";
import reviewSchema from "@/lib/_definations/addReview";
import prisma from "../lib/prisma/prismaClient";
import { revalidatePath } from "next/cache";

type Movie = {
  name: string;
  releaseDate: string;
};

type AddMovieReturnObject = {
  success: boolean;
  name?: string | undefined;
  releaseDate?: string | undefined;
};

/**
 * Reviewer name (optional)
    Rating (max 10)
    Review comments
 */
type AddReviewFormReturnObject = {
  success: boolean;
  reviewerName?: string | undefined;
  rating?: string | undefined;
  comments?: string | undefined;
  selectedMovie?: string | undefined;
};
export async function addMovie(
  previousState: any,
  formData: FormData,
): Promise<AddMovieReturnObject> {
  const returnObject: AddMovieReturnObject = {
    success: false,
    name: "",
    releaseDate: "",
  };
  const name = formData.get("name");
  const releaseDate = formData.get("releaseDate");

  const validationResult = await movieSchema.safeParseAsync({
    name,
    releaseDate,
  });

  if (!validationResult.success) {
    const { name, releaseDate } = validationResult.error.flatten().fieldErrors;
    returnObject.name = name?.join(", ");
    returnObject.releaseDate = releaseDate?.join(", ");
    returnObject.success = false;
    return returnObject;
  }

  const movie = await prisma.movie.create({
    data: {
      name: name as string,
      releaseDate: new Date(releaseDate as string),
    },
  });

  returnObject.success = true;
  return returnObject;
}

export async function addReview(
  previousState: any,
  formData: FormData,
): Promise<AddReviewFormReturnObject> {
  const returnObject: AddReviewFormReturnObject = {
    success: false,
    reviewerName: "",
    rating: "",
    comments: "",
    selectedMovie: "",
  };
  const reviewerName = formData.get("reviewerName") as string;
  const rating = formData.get("rating") as unknown as Number;
  const comments = formData.get("comments");
  const selectedMovie = formData.get("selectedMovie");
  console.log("review", reviewerName, rating, comments, selectedMovie);
  const validationResult = await reviewSchema.safeParseAsync({
    movieID: selectedMovie,
    reviewerName: reviewerName,
    rating: Number(rating),
    comments: comments,
  });
  if (!validationResult.success) {
    const { movieID, reviewerName, rating, comments } =
      validationResult.error.flatten().fieldErrors;
    returnObject.comments = comments?.join(", ");
    returnObject.reviewerName = reviewerName?.join(", ");
    returnObject.rating = rating?.join(", ");
    returnObject.selectedMovie = movieID?.join(", ");
    console.log("returnObject", returnObject);
    returnObject.success = false;
    return returnObject;
  }

  const _ = await prisma.review.create({
    data: {
      movieId: selectedMovie as string,
      reviewer: reviewerName ? reviewerName : "Anonymous",
      rating: parseFloat(rating as unknown as string),
      comments: comments as string,
    },
  });
  returnObject.success = true;
  return returnObject;
}

type DeleteMovieReturnObject = {
  success: boolean;
  message?: string;
};

export async function deleteMovie(pre: any, formData: FormData) {
  const returnObject: DeleteMovieReturnObject = {
    success: false,
    message: "",
  };
  const movieId = formData.get("movieId") as string;
  try {
    await prisma.movie.delete({ where: { id: movieId } });
    returnObject.success = true;
    returnObject.message = "Movie deleted successfully";
  } catch (error: any) {
    returnObject.success = false;
    returnObject.message = "Failed to delete movie: " + error.message;
  }
  // revalidatePath("/")
  return returnObject;
}

type DeleteReviewReturnObject = {
  success: boolean;
  message?: string;
};

export async function deleteReview(
  pre: any,
  formData: FormData,
): Promise<DeleteReviewReturnObject> {
  const returnObject: DeleteReviewReturnObject = {
    success: false,
    message: "",
  };
  const reviewId = formData.get("reviewId") as string;
  try {
    await prisma.review.delete({ where: { id: reviewId } });
    returnObject.success = true;
    returnObject.message = "Review deleted successfully";
  } catch (error: any) {
    returnObject.success = false;
    returnObject.message = "Failed to delete review: " + error.message;
  }

  return returnObject;
}

type UpdateMovieReturnObject = {
  success: boolean;
  name?: string | undefined;
  releaseDate?: string | undefined;
};

export async function updateMovie(
  pre: any,
  formData: FormData,
): Promise<UpdateMovieReturnObject> {
  const returnObject: UpdateMovieReturnObject = {
    success: false,
    name: "",
    releaseDate: "",
  };

  const name = formData.get("name");
  const releaseDate = formData.get("releaseDate");
  const movieId = formData.get("movieId") as string;

  const validationResult = await movieSchema.safeParseAsync({
    name,
    releaseDate,
  });

  if (!validationResult.success) {
    const { name, releaseDate } = validationResult.error.flatten().fieldErrors;
    returnObject.name = name?.join(", ");
    returnObject.releaseDate = releaseDate?.join(", ");
    return returnObject;
  }

  try {
    await prisma.movie.update({
      where: { id: movieId },
      data: {
        name: name as string,
        releaseDate: new Date(releaseDate as string),
      },
    });

    returnObject.success = true;
  } catch (error) {
    returnObject.success = false;
  }

  return returnObject;
}

type UpdateReviewReturnObject = {
  success: boolean;
  reviewerName?: string | undefined;
  rating?: string | undefined;
  comments?: string | undefined;
};

export async function updateReview(
  pre: any,
  formData: FormData,
): Promise<UpdateReviewReturnObject> {
  const returnObject: UpdateReviewReturnObject = {
    success: false,
    reviewerName: "",
    rating: "",
    comments: "",
  };

  const reviewerName = formData.get("reviewerName") as string;
  const rating = formData.get("rating") as unknown as Number;
  const comments = formData.get("comments");
  const reviewId = formData.get("reviewId") as string;
  const partialReviewSchema = reviewSchema.omit({
    movieID: true,
  });
  const validationResult = await partialReviewSchema.safeParseAsync({
    reviewerName: reviewerName,
    rating: Number(rating),
    comments: comments,
  });
  if (!validationResult.success) {
    const { reviewerName, rating, comments } =
      validationResult.error.flatten().fieldErrors;
    returnObject.reviewerName = reviewerName?.join(", ");
    returnObject.rating = rating?.join(", ");
    returnObject.comments = comments?.join(", ");
    console.log("returnObject", returnObject);
    return returnObject;
  }

  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: {
        reviewer: reviewerName ? reviewerName : "Anonymous",
        rating: parseFloat(rating as unknown as string),
        comments: comments as string,
      },
    });

    returnObject.success = true;
  } catch (error) {
    returnObject.success = false;
  }

  return returnObject;
}
