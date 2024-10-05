"use client";
import { PencilIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import DeleteMovieForm from "./DeleteMovieForm";

function Landing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const fetchMoviesByQuery = useCallback(async (query: string) => {
    console.log("fetchMoviesByQuery");
    const res = await fetch(
      `/api/search-movie?query=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    setMovies(data);
  }, []);
  const fetchMovies = useCallback(async () => {
    console.log("fetchMovies");
    const res = await fetch(`/api/movies?limit=50&page=${page}`);
    console.log(res);
    const data = await res.json();
    setMovies([...movies, ...data]);
  }, [page]);
  useEffect(() => {
    if (query) {
      fetchMoviesByQuery(query);
    } else {
      fetchMovies();
    }
  }, [query, fetchMoviesByQuery, fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 !text-black">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        The best movie reviews site!
      </h2>

      <Search onChange={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default Landing;

const Search = ({ onChange }: { onChange: (query: string) => void }) => {
  return (
    <div className="relative mb-8 max-w-2xl mr-auto">
      <input
        type="text"
        placeholder="Search for your favourite movie"
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
      />
      <svg
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-[#dfdefe] rounded-lg shadow-md p-6 !text-black">
        <h3 className="text-xl font-semibold mb-2">{movie.name}</h3>
        <p className="text-gray-600 mb-4 italic">
          Released: {new Date(movie.releaseDate).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">
            Rating:{" "}
            {movie.averageRating
              ? `${movie.averageRating.toFixed(2)}/10`
              : "No Reviews"}
          </span>
          <div className="space-x-2">
            <Link href={`/edit/movie/${movie.id}`}>
              <button className="text-gray-600 hover:text-[#6559f5]">
                <PencilIcon className="h-5 w-5" />
              </button>
            </Link>
            <DeleteMovieForm id={movie.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};
