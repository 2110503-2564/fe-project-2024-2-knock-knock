"use client";

import { useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";

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
      await axios.post("/api/reviews", {
        hotelId,
        rating,
        comment,
      });
      onClose();
    } catch (err) {
      console.error("Review failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalStyle} className="text-black">
      <div style={modalContentStyle}>
        <h3>ให้คะแนนโรงแรม</h3>

        <Rating
          name="hotel-rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />

        <textarea
          placeholder="เขียนรีวิว..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", marginTop: 8 }}
          className="bg-white"
        />
        <div style={{ marginTop: 8 }}>
          <button onClick={submitReview} disabled={loading}>
            ส่ง
          </button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

const modalStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "8px",
  minWidth: "300px",
};
