"use client";
import { updateMovie } from "@/app/actions";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

const EditMovieForm = ({ movie }: { movie: Movie }) => {
  console.log(movie);
  const [date, setDate] = useState(movie.releaseDate);
  const [name, setName] = useState(movie.name);
  const [state, action] = useFormState(updateMovie, null);
  const router = useRouter();
  if (state?.success) {
    router.push("/");
  }
  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="movieId" value={movie.id} />
      <div>
        <label
          htmlFor="movieTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Movie Name
        </label>
        <input
          type="text"
          id="movieTitle"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          defaultValue="Star Wars: A New Hope"
        />
        {state?.name && <p className="text-red-500">{state.name}</p>}
      </div>
      <div>
        <label
          htmlFor="releaseDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Release Date
        </label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          defaultValue="1977-05-25"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split("T")[0]}
        />
        {state?.releaseDate && (
          <p className="text-red-500">{state.releaseDate}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Link href="/">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
