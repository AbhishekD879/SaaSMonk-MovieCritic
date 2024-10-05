import { z } from "zod";

const reviewSchema = z.object({
  movieID: z.string().min(1, { message: "You must select a movie" }), // Ensure a movie is selected
  reviewerName: z.string().optional(), // Name can be empty
  rating: z
    .number()
    .min(0, { message: "Rating must be at least 0" }) // Rating must be between 0 and 10
    .max(10, { message: "Rating cannot be more than 10" }),
  comments: z.string().min(1, { message: "Comments are required" }), // Comments must not be empty
});

export default reviewSchema;
