"use client";

import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";

export default function ReviewList({ hotelId }: { hotelId: string }) {
  const [review, addReview] = useState<ReviewJson>();

  useEffect(() => {
    const fetchReview = async () => {
      var reviews = await getReviews(hotelId);
      addReview(reviews);
    };
    fetchReview();
  }, []);
  if (review === undefined) return null;

  const average =
    review.data.length > 0
      ? (
          review.data.reduce(
            (sum: number, currentReview: any) => sum + currentReview.rating,
            0
          ) / review.data.length
        ).toFixed(2)
      : 0;

  return (
    <div className="text-black">
      <h3>คะแนนเฉลี่ย: {average} ⭐</h3>
      <ul>
        {review.data.map((reviewItem) => (
          <li key={reviewItem.user}>
            <strong>{reviewItem.rating} ดาว</strong> โดย {reviewItem.user}:{" "}
            {reviewItem.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
