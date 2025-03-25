"use client";

import { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

type Props = {
  hotelId: string;
  onClose: () => void;
};

export default function ReviewModal({ hotelId, onClose }: Props) {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating) return alert("กรุณาให้คะแนนก่อนส่ง");
    setLoading(true);
    try {
      await axios.post(
        `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${hotelId}/reviews`,
        {
          rating,
          comment,
        }
      );
      alert("ส่งรีวิวสำเร็จ");
      setRating(0);
      setComment("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการส่งรีวิว");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-md">
        <h3 className="text-lg font-semibold mb-3">ให้คะแนนโรงแรม</h3>

        <Rating
          name="rating"
          value={rating}
          onChange={(_, newVal) => setRating(newVal)}
        />

        <textarea
          placeholder="เขียนรีวิว..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full mt-3 border border-gray-300 rounded-md p-2 resize-none"
        />

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={submitReview}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            ส่งรีวิว
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
