import { z } from "zod";

const movieSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }), // The name field must be a string and is required
  releaseDate: z.string().refine(
    (value) => {
      // Validate that the release date follows the 'YYYY-MM-DD' format
      return /^\d{4}-\d{2}-\d{2}$/.test(value);
    },
    { message: "Release date must be a valid date in the format YYYY-MM-DD" },
  ), // Date must match the 'date' type from the input
});

export default movieSchema;
