'use client'
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import ReviewList from "@/components/ReviewList";
import ReviewModal from "@/components/ReviewModal";
import { useEffect, useState } from "react";

export default function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const [hotelDetail, setHotelDetail] = useState<any>()
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      const result = await getHotel(params.hid)
      setHotelDetail(result.data)
    }
    fetchHotel()
  }, [params.hid])

  if (hotelDetail === undefined) return null;
  return (
    <main className="text-center p-5 px-40">
      <h1 className="text-lg font-medium text-black">
        {hotelDetail.name}
      </h1>
      <div className="flex flex-row my-5">
        <Image
          src={hotelDetail.picture}
          alt="Hotel Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5 text-black">
          <div className="text-md mx-5 text-black text-left">
            Name: {hotelDetail.name}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Address: {hotelDetail.address}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Tel: {hotelDetail.telephone}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Price: {hotelDetail.price}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Promotion: {hotelDetail.promotion}{" "}
          </div>
          <Link
            href={`/booking?id=${params.hid}&model=${hotelDetail.model}`}
          >
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm transition duration-300 shadow-md transform hover:scale-105"
              name="Book Hotel"
            >
              Book Hotel
            </button>
          </Link>
          <button
            onClick={() => setShowReviewModal(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            เขียนรีวิว
          </button>
          {showReviewModal && (
            <ReviewModal
              hotelId={hotelDetail._id}
              onClose={() => setShowReviewModal(false)}
            />
          )}
          <ReviewList hotelId={params.hid} />
        </div>
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//   return [{ hid: "001" }, { hid: "002" }, { hid: "003" }];
// }
