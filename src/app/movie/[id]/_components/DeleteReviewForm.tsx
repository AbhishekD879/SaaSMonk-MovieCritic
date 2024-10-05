"use client";
import { deleteReview } from "@/app/actions";
import { TrashIcon } from "lucide-react";
import { useFormState } from "react-dom";

function DeleteReviewForm({ id }: { id: string }) {
  const [state, action] = useFormState(deleteReview, null);
  if (state?.success) {
    window.location.reload();
  }
  return (
    <form action={action} className="inline-flex justify-center items-center">
      <input type="hidden" name="reviewId" value={id} />
      <button type="submit" className="text-gray-400 hover:text-[#6559f5]">
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export default DeleteReviewForm;
