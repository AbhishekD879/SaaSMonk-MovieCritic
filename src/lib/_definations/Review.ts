type Review = {
  id: string;
  movieId: string;
  movie: Movie;
  reviewer?: string | null;
  rating: number;
  comments: string;
  createdAt: Date;
};
