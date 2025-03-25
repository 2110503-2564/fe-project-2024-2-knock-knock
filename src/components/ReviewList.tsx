"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import getReviews from "@/libs/getReviews";
import addReview from "@/libs/addReview";

export default function ReviewList({
  hotelId,
  token,
}: {
  hotelId: string;
  token: string;
}) {
  const [review, getReview] = useState<ReviewJson>();
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [commentText, setCommentText] = useState("");
  const [commentsToShow, setCommentsToShow] = useState(3);

  useEffect(() => {
    const fetchReview = async () => {
      const reviews = await getReviews(hotelId);
      getReview(reviews);
    };
    fetchReview();
  }, [hotelId]);

  if (!review) return null;

  const average =
    review.data.length > 0
      ? (
          review.data.reduce(
            (sum: number, currentReview: any) => sum + currentReview.rating,
            0
          ) / review.data.length
        ).toFixed(1)
      : "0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview(hotelId, ratingValue || 0, commentText, token);
      setRatingValue(0);
      setCommentText("");
      const updatedReviews = await getReviews(hotelId);
      getReview(updatedReviews);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const loadMoreComments = () => {
    setCommentsToShow(commentsToShow + 10);
  };

  return (
    <div className="text-black bg-white border rounded-lg p-6 shadow-md max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          Average Rating: {average} ⭐
        </h3>
        <Rating value={parseFloat(average)} precision={0.5} readOnly />
        <p className="text-sm text-gray-500 mt-1">
          Based on {review.data.length} review(s)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <h4 className="text-lg font-semibold text-gray-700">
          Write your review
        </h4>
        <Rating
          name="user-rating"
          value={ratingValue}
          precision={0.5}
          onChange={(_, newValue) => setRatingValue(newValue)}
        />
        <TextField
          label="Comment"
          multiline
          fullWidth
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!ratingValue || commentText.trim() === ""}
        >
          Submit Review
        </Button>
      </form>

      <div className="space-y-6">
        {review.data.slice(0, commentsToShow).map((reviewItem, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-none"
          >
            <Rating value={reviewItem.rating} readOnly size="small" />
            <div className="mt-1 text-sm text-gray-700">
              <span className="font-medium">{reviewItem.user}</span> wrote:
              <p className="mt-1 ml-2 text-gray-600">{reviewItem.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {review.data.length > commentsToShow && (
        <div className="mt-6 text-center transition duration-300 transform hover:scale-105">
          <Button variant="outlined" onClick={loadMoreComments}>
            Show More Comments
          </Button>
        </div>
      )}
    </div>
  );
}
