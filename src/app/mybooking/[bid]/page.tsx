"use client";
import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import updateBooking from "@/libs/updateBooking";

export default function UpdateBooking({ params }: { params: { bid: string } }) {
  const [bookingDate, setBookDate] = useState<Dayjs | null>(null);
  const [hotel, setHotel] = useState("Mountain View Inn");
  const [nights, setNight] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  const makebooking = async () => {
    if (nights > 3) {
      setShowModal(true);
      return;
    }

    if (bookingDate && hotel && nights) {
      const bookingDateString = dayjs(bookingDate).format("YYYY-MM-DD");
      const result = await updateBooking(
        params.bid,
        bookingDateString,
        hotel,
        nights,
        session?.user.token || ""
      );
    }
  };

  return (
    <>
      <main className="min-h-screen w-screen items-center justify-center bg-gradient-to-r from-sky-100 to-white pt-20">
        <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 w-full max-w-3xl mx-auto space-y-8 mt-10">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Update Your Booking
          </h1>

          <div className="space-y-1">
            <label className="text-gray-600 text-sm font-medium">
              Select Date, Hotel, and Number of Nights
            </label>
            <DateReserve
              onNightChange={(value: number) => setNight(value)}
              onDateChange={(value: Dayjs) => setBookDate(value)}
              onHotelChange={(value: string) => setHotel(value)}
            />
          </div>

          <button
              className="w-full mt-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 transition duration-300 shadow-md transform hover:scale-105"
            name="Update Booking"
            onClick={makebooking}
          >
            Update Booking
          </button>
        </div>
      </main>

      {/* Modal for over 3 nights */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-red-600 mb-3 text-center">
              Sorry
            </h2>
            <p className="text-gray-800 text-center">
              You can't book more than 3 nights at once.
            </p>
            <div className="flex justify-center mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-300 shadow-md transform hover:scale-105"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
