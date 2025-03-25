"use client";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export default function ReviewList({ hotelId }: { hotelId: string }) {
  const { data, error } = useSWR(
    `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${hotelId}/reviews`,
    fetcher
  );

  if (error) return <div>เกิดข้อผิดพลาดในการโหลดรีวิว</div>;
  if (!data) return <div>กำลังโหลดรีวิว...</div>;

  const average = (
    data.reduce((sum: number, r: any) => sum + r.rating, 0) / data.length
  ).toFixed(1);

  return (
    <div className="text-black">
      <h3>คะแนนเฉลี่ย: {average} ⭐</h3>
      <ul>
        {data.map((review: any, idx: number) => (
          <li key={idx}>
            <strong>{review.rating} ดาว</strong> โดย {review.user}:{" "}
            {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
