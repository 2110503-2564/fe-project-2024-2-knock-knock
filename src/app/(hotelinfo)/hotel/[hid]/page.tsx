"use client";
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";
import ReviewList from "@/components/ReviewList";
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

  if (hotelDetail === undefined) return null;

  return (
    <main className="p-6 px-10 lg:px-40 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {hotelDetail.data.name}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <Image
          src={hotelDetail.data.picture}
          alt="Hotel Image"
          width={0}
          height={0}
          sizes="80vw"
          className="rounded-xl w-full lg:w-[800px] h-[400px] lg:h-[700px] object-cover shadow-md"
        />

        <div className="flex-1 text-black space-y-4">
          <div className="text-base text-left">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {hotelDetail.data.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {hotelDetail.data.address}
            </p>
            <p>
              <span className="font-semibold">Tel:</span>{" "}
              {hotelDetail.data.telephone}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              {hotelDetail.data.price}
            </p>
            <p>
              <span className="font-semibold">Promotion:</span>{" "}
              {hotelDetail.data.promotion}
            </p>
          </div>

          <Link href={`/booking?id=${params.hid}}`}>
            <button
              className="mt-4 w-full lg:w-auto rounded-md bg-sky-600 hover:bg-indigo-600 px-5 py-2 text-white shadow transition duration-300 transform hover:scale-105"
              name="Book Hotel"
            >
              Book Hotel
            </button>
          </Link>

          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
              Customer Reviews
            </h2>
            <ReviewList hotelId={params.hid} token={session?.user.token || ""} />
          </div>
        </div>
      </div>
    </main>
  );
}
