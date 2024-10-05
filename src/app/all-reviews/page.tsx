"use client";
import { useState, useEffect } from "react";
import { debounce } from "@/utils/debounc"; // Assuming this is where your debounce utility is located
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import DeleteReviewForm from "../movie/[id]/_components/DeleteReviewForm";

export default function ReviewSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      fetchReviews(searchTerm);
    } else {
      //   setReviews([]);
      fetchReviews("");
    }
  }, [searchTerm]);

  const fetchReviews = debounce(async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews?search=${query}`);
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, 500); // Debounce the search requests by 500ms

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 !text-black">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Search Reviews</h2>

      <input
        type="text"
        placeholder="Search reviews..."
        className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6559f5]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p className="mt-4">Loading reviews...</p>}

      <div className="space-y-6 mt-8">
        {reviews.length > 0
          ? reviews.map((review: Review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 border-gray-400 border-[4px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-800">{review.comments}</p>
                  <span className="text-2xl font-bold text-[#6559f5]">
                    {review.rating}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 italic">
                    By: {review.reviewer || "Anonymous"}
                  </span>
                  <div className="space-x-2 flex items-center">
                    <Link
                      href={`/edit/review/${review.id}`}
                      className="text-gray-600 hover:text-[#6559f5]"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <DeleteReviewForm id={review.id} />
                  </div>
                </div>
              </div>
            ))
          : !loading && <p>No reviews found.</p>}
      </div>
    </div>
  );
}
