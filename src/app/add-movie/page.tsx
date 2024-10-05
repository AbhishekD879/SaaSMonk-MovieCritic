"use client";
import { useFormState, useFormStatus } from "react-dom";
import { addMovie } from "@/app/actions";
import Link from "next/link";
import { useState } from "react";
export default function AddMovieForm() {
  const [state, addMovieAction] = useFormState(addMovie, null);
  const [modelClosed, setModelClosed] = useState(false);
  if (state?.success && !modelClosed)
    return <SuccessMovieAddModel setModelClosed={setModelClosed} />;
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md !text-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add new movie</h2>
      <form action={addMovieAction} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
            required
          />
          {state?.name && <p className="text-red-500">{state.name}</p>}
        </div>
        <div>
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Release date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
            required
          />
          {state?.releaseDate && (
            <p className="text-red-500">{state.releaseDate}</p>
          )}
        </div>
        <AddMovieFormButton setModelClosed={setModelClosed} />
      </form>
    </div>
  );
}

const AddMovieFormButton = ({
  setModelClosed,
}: {
  setModelClosed: (value: boolean) => void;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={() => setModelClosed(false)}
      disabled={pending}
      type="submit"
      className="w-full px-4 py-2 bg-[#6559f5] text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2 transition-colors"
    >
      Create movie
    </button>
  );
};

const SuccessMovieAddModel = ({
  setModelClosed,
}: {
  setModelClosed: (value: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Movie added successfully!
        </h3>
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <button
              type="button"
              className="w-full px-4 py-2 bg-[#6559f5] text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2 transition-colors"
            >
              Go to Home
            </button>
          </Link>

          <button
            onClick={() => setModelClosed(true)}
            type="button"
            className="w-full px-4 py-2 border border-[#6559f5] text-[#6559f5] rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2 transition-colors"
          >
            Add New Movie
          </button>
        </div>
      </div>
    </div>
  );
};
