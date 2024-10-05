"use client";

import { TrashIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { deleteMovie } from "../actions";

const DeleteMovieForm = ({ id }: { id: string }) => {
  const [state, action] = useFormState(deleteMovie, null);
  if (state?.success) {
    window.location.reload();
  }
  return (
    <form className="inline" action={action}>
      <button
        onClick={(e) => e.stopPropagation()}
        type="submit"
        className="text-gray-600 hover:text-[#6559f5]"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
      <input type="hidden" name="movieId" value={id} />
    </form>
  );
};

export default DeleteMovieForm;
