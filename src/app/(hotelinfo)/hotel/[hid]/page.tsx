"use client";
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import ReviewList from "@/components/ReviewList";
import ReviewModal from "@/components/ReviewModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const [hotelDetail, getHotelDeatail] = useState<any>();

  useEffect(() => {
    const fetchHotel = async () => {
      var hotel = await getHotel(params.hid);
      getHotelDeatail(hotel);
    };
    fetchHotel();
  }, [params.hid]);
  const { data: session } = useSession();
  const [showReviewModal, setShowReviewModal] = useState(false);
  if (hotelDetail === undefined) return null;
  // const hotelDetail = await getHotel(params.hid);
  console.log(hotelDetail);
  return (
    <main className="text-center p-5 px-40">
      <h1 className="text-lg font-medium text-black">
        {hotelDetail.data.name}
      </h1>
      <div className="flex flex-row my-5">
        <Image
          src={hotelDetail.data.picture}
          alt="Hotel Image"
          width={0}
          height={0}
          sizes="80vw"
          className="rounded-lg w-[800px] h-[700px]"
        />
        <div className="text-md mx-5 text-black">
          <div className="text-md mx-5 text-black text-left">
            Name: {hotelDetail.data.name}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Address: {hotelDetail.data.address}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Tel: {hotelDetail.data.telephone}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Price: {hotelDetail.data.price}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Promotion: {hotelDetail.data.promotion}{" "}
          </div>
          <Link href={`/booking?id=${params.hid}}`}>
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm transition duration-300 shadow-md transform hover:scale-105"
              name="Book Hotel"
            >
              Book Hotel
            </button>
          </Link>
          {showReviewModal && (
            <ReviewModal
              hotelId={hotelDetail.data._id}
              onClose={() => setShowReviewModal(false)}
              token={session?.user.token || ""}
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
