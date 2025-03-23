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
      <main className="w-[100%] flex flex-col item-center space-y-4">
        <div className="text-xl font-medium text-black">Hotel Booking</div>
        <div className="w-fit space-y-2 ">
          <div className="text-md text-left text-gray-600">
            Pick-Up Date and Location
          </div>
          <DateReserve
            onNightChange={(value: number) => setNight(value)}
            onDateChange={(value: Dayjs) => setBookDate(value)}
            onHotelChange={(value: string) => setHotel(value)}
          />
        </div>
        <button
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm transition duration-500"
          name="Book Hotel"
          onClick={makebooking}
        >
          Book Hotel
        </button>
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
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
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
