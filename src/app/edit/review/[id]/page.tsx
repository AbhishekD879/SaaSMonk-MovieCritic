"use client";
import { updateReview } from "@/app/actions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function EditReview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [state, action] = useFormState(updateReview, null);
  if (state?.success) {
    router.back();
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 !text-black">
      <button
        onClick={() => router.back()}
        className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movie Reviews
      </button>
      <h1 className="text-3xl font-bold mb-6">Edit Review</h1>
      <form action={action} className="space-y-6">
        <input type="hidden" name="reviewId" value={params.id} />
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
          {state?.reviewerName && (
            <p className="text-red-500">{state.reviewerName}</p>
          )}
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
          {state?.rating && <p className="text-red-500">{state.rating}</p>}
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
          {state?.comments && <p className="text-red-500">{state.comments}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.back()}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6559f5] focus:ring-offset-2"
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
}
