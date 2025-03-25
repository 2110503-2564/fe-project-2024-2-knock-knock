"use client";

import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ReviewList({ hotelId }: { hotelId: string }) {
  const [review, addReview] = useState<ReviewJson>();
  const [ratingValue, setRatingValue] = useState<number | null>(5);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      const reviews = await getReviews(hotelId);
      addReview(reviews);
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
        ).toFixed(2)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ส่งข้อมูล review ไปยัง backend
    console.log("ส่งรีวิว:", {
      rating: ratingValue,
      comment: commentText,
    });
    setRatingValue(5);
    setCommentText("");
  };

  return (
    <div className="text-black p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        คะแนนเฉลี่ย: {average} ⭐
      </h3>

      {/* ฟอร์มให้ดาวและแสดงความคิดเห็น */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <h4 className="text-md font-semibold">แสดงความคิดเห็นของคุณ</h4>
        <div>
          <Rating
            name="user-rating"
            value={ratingValue}
            onChange={(_, newValue) => setRatingValue(newValue)}
          />
        </div>
        <div>
          <TextField
            label="ความคิดเห็น"
            multiline
            fullWidth
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!ratingValue || commentText.trim() === ""}
        >
          ส่งความคิดเห็น
        </Button>
      </form>

      {/* รายการรีวิว */}
      <ul className="space-y-4">
        {review.data.map((reviewItem, index) => (
          <li key={index} className="border-b pb-3">
            <Rating value={reviewItem.rating} readOnly />
            <div className="text-sm mt-1">
              โดย <span className="font-medium">{reviewItem.user}</span>:<br />
              <span className="ml-2">{reviewItem.comment}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
