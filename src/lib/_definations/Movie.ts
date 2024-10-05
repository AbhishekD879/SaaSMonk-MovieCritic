type Movie = {
  id: string;
  name: string;
  releaseDate: Date;
  averageRating?: number | null;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
};
