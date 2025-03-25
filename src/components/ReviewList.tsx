"use client";

import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
  const [commentsToShow, setCommentsToShow] = useState(3); // จำนวนคอมเมนต์ที่จะแสดงในตอนแรก

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
        ).toFixed(1) // ปรับค่าเฉลี่ยให้มีทศนิยม 1 ตำแหน่ง
      : "0";

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await addReview(hotelId, ratingValue || 0, commentText, token);
      setRatingValue(0);
      setCommentText("");
      const updatedReviews = await getReviews(hotelId);
      getReview(updatedReviews);
    } catch (error) {
      console.error("Error add review:", error);
    }
  };

  // ฟังก์ชันเพิ่มจำนวนคอมเมนต์ที่แสดง
  const loadMoreComments = () => {
    setCommentsToShow(commentsToShow + 10);
  };

  return (
    <div className="text-black p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        คะแนนเฉลี่ย: {average} ⭐
      </h3>
      
      {/* แสดงดาวตามคะแนนเฉลี่ย */}
      <div className="mb-4">
        <Rating value={parseFloat(average)} precision={0.5} readOnly />
      </div>

      {/* ฟอร์มให้ดาวและแสดงความคิดเห็น */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <h4 className="text-md font-semibold">แสดงความคิดเห็นของคุณ</h4>
        <div>
          <Rating
            name="user-rating"
            value={ratingValue}
            precision={0.5}  // เพิ่ม precision สำหรับครึ่งคะแนน
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
        {review.data.slice(0, commentsToShow).map((reviewItem, index) => (
          <li key={index} className="border-b pb-3">
            <Rating value={reviewItem.rating} readOnly />
            <div className="text-sm mt-1">
              โดย <span className="font-medium">{reviewItem.user}</span>:<br />
              <span className="ml-2">{reviewItem.comment}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* ปุ่มแสดงคอมเมนต์เพิ่มเติม */}
      {review.data.length > commentsToShow && (
        <div className="mt-4 text-center">
          <Button variant="outlined" onClick={loadMoreComments}>
            แสดงคอมเมนต์เพิ่มเติม
          </Button>
        </div>
      )}
    </div>
  );
}
