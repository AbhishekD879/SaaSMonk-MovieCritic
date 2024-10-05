"use client";
import MovieSelect from "./_components/MovieSelect";
import { useFormState } from "react-dom";
import { addReview } from "../actions";
import Link from "next/link";

export default function AddReviewForm() {
  const [state, addReviewAction] = useFormState(addReview, null);
  if (state?.success) return <SuccessReviewAddModel />;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md !text-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add new review</h2>
      <form action={addReviewAction} className="space-y-4">
        <MovieSelect />
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="reviewerName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rating out of 10
          </label>
          <input
            name="rating"
            type="number"
            id="rating"
            min="0"
            max="10"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
            required
          />
        </div>
        <div>
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Review comments
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#6559f5] text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2 transition-colors"
        >
          Add review
        </button>
      </form>
    </div>
  );
}

const SuccessReviewAddModel = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Review added successfully!
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
          <Link href="/add-movie">
            <button
              type="button"
              className="w-full px-4 py-2 border border-[#6559f5] text-[#6559f5] rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2 transition-colors"
            >
              Add New Review
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
