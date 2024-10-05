import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "@/utils/debounc"; // import debounce utility

export default function MovieSelect() {
  const [query, setQuery] = useState(""); // input value
  const [movies, setMovies] = useState([]); // list of movies from the server
  const [isDropdownVisible, setDropdownVisible] = useState(false); // to toggle dropdown
  const [isLoading, setIsLoading] = useState(false); // for loading state
  const hiddenRef = useRef(null);
  // Fetch movies from the API based on the query
  const fetchMovies = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    const res = await fetch(
      `/api/search-movie?query=${encodeURIComponent(searchQuery)}`,
    );
    const data = await res.json();
    setMovies(data);
    setIsLoading(false);
  }, []);

  // Debounced version of fetchMovies to avoid too many API calls
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), [
    fetchMovies,
  ]);

  useEffect(() => {
    if (query) {
      if (
        movies &&
        movies.some(
          (movie: { id: string; name: string }) => movie.name === query,
        )
      ) {
        setDropdownVisible(false);
        setQuery(query);
        return;
      }
      debouncedFetchMovies(query); // trigger the debounced API call
      setDropdownVisible(true); // show dropdown on typing
    } else {
      setDropdownVisible(false); // hide dropdown if query is empty
    }
  }, [query, debouncedFetchMovies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectMovie = (movie: { id: string; name: string }) => {
    if (hiddenRef.current) {
      (hiddenRef.current as HTMLInputElement).value = movie.id;
    }

    setQuery(movie.name);
    setDropdownVisible(false); // hide dropdown on selection
  };

  return (
    <div>
      <label
        htmlFor="movie"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select a movie
      </label>
      <div className="relative">
        <input
          id="movie"
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          placeholder="Type to select a movie"
          onFocus={() => setDropdownVisible(true)} // show dropdown on input focus
        />
        <input ref={hiddenRef} type="text" hidden={true} name="selectedMovie" />
        {isDropdownVisible && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
            {isLoading && (
              <li className="cursor-default select-none px-4 py-2 text-gray-700">
                Loading...
              </li>
            )}
            {!isLoading && movies.length === 0 && query !== "" && (
              <li className="cursor-default select-none px-4 py-2 text-gray-700">
                No movies found
              </li>
            )}
            {!isLoading &&
              movies.map((movie: { id: string; name: string }) => (
                <li
                  key={movie.id}
                  onClick={() => {
                    handleSelectMovie(movie);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-[#6559f5] hover:text-white"
                >
                  {movie.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
