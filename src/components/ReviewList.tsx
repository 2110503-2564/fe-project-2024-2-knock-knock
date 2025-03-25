"use client";

import getReviews from "@/libs/getReviews";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import addReview from "@/libs/addReview";
import updateReview from "@/libs/updateReview";
import { deleteReview } from "@/libs/deleteReview";
import getUserProfile from "@/libs/getUserProfile";

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
  const [openDialog, setOpenDialog] = useState(false); // เปิด/ปิด Dialog
  const [editReviewId, setEditReviewId] = useState<string | null>(null); // เก็บ id ของรีวิวที่ต้องการแก้ไข
  const [editRating, setEditRating] = useState<number | null>(0); // เก็บค่าคะแนนสำหรับการแก้ไข
  const [editComment, setEditComment] = useState(""); // เก็บความคิดเห็นสำหรับการแก้ไข
  const [currentUser, getMe] = useState<any>();

  useEffect(() => {
    const fetchReview = async () => {
      const reviews = await getReviews(hotelId);
      getReview(reviews);
    };
    fetchReview();
  }, [hotelId]);

  if (token !== "") {
    useEffect(() => {
      const fetchMe = async () => {
        const me = await getUserProfile(token);
        getMe(me);
      };
      fetchMe();
    }, [token]);
    if (!currentUser) return null;
  }

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

  const loadMoreComments = () => {
    setCommentsToShow(commentsToShow + 10);
  };

  const handleUpdate = (
    reviewId: string,
    currentRating: number,
    currentComment: string
  ) => {
    setEditReviewId(reviewId);
    setEditRating(currentRating);
    setEditComment(currentComment);
    setOpenDialog(true); // เปิด Dialog เมื่อคลิก Update
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm("คุณต้องการลบรีวิวนี้หรือไม่?")) {
      await deleteReview(reviewId, token);
      const updatedReviews = await getReviews(hotelId);
      getReview(updatedReviews);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = async () => {
    if (editReviewId) {
      try {
        await updateReview(editReviewId, editRating || 0, editComment, token);
        const updatedReviews = await getReviews(hotelId);
        getReview(updatedReviews);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error update review:", error);
      }
    }
  };

  return (
    <div className="text-black p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">คะแนนเฉลี่ย: {average} ⭐</h3>

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
            precision={0.5}
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
          <li key={index} className="border-b pb-3 relative">
            {/* Tool Slot: แสดงปุ่ม Update และ Delete */}
            <div className="absolute top-0 right-0 space-x-2 p-1">
              {(currentUser.data.role === "admin" ||
                reviewItem.user === currentUser.data.name) && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      handleUpdate(
                        reviewItem._id,
                        reviewItem.rating,
                        reviewItem.comment
                      )
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleDelete(reviewItem._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>

            <Rating value={reviewItem.rating} precision={0.5} readOnly />
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

      {/* Dialog สำหรับการอัปเดตรีวิว */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>อัปเดตรีวิว</DialogTitle>
        <DialogContent>
          <div className="space-y-3">
            <Rating
              name="update-rating"
              value={editRating}
              precision={0.5}
              onChange={(_, newValue) => setEditRating(newValue)}
            />
            <TextField
              label="ความคิดเห็น"
              multiline
              fullWidth
              rows={3}
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            ยกเลิก
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
