"use client";
import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import addBooking from "@/libs/addBooking";
import { useSession } from "next-auth/react";

const localHotels = [
  { id: "67dd2c1571dd25247abb1a41", name: "Mountain View Inn" },
  { id: "67dd2bf171dd25247abb1a3e", name: "Ocean Breeze Resort" },
  { id: "67dd2a6371dd25247abb1a38", name: "Hotel Sunshine" },
];

export default function Booking() {
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
      const selectedHotel = localHotels.find((h) => h.name === hotel);
      if (!selectedHotel) {
        console.error("Not found");
        return;
      }
      const hotelId = selectedHotel.id;

      const bookingDateString = dayjs(bookingDate).format("YYYY-MM-DD");
      const result = await addBooking(
        hotelId,
        bookingDateString,
        nights,
        session?.user.token || ""
      );
    }
  };

  return (
    <>
      <main className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-white">
        <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 w-full max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Book a Hotel
          </h1>

          <div className="space-y-2">
            <label className="text-gray-600 text-lg font-medium block">
              Choose your date, hotel, and number of nights
            </label>
            <DateReserve
              onNightChange={(value: number) => setNight(value)}
              onDateChange={(value: Dayjs) => setBookDate(value)}
              onHotelChange={(value: string) => setHotel(value)}
            />
          </div>

          <button
            className="w-full rounded-xl bg-sky-600 hover:bg-indigo-600 text-white font-semibold py-4 transition duration-300 shadow-md transform hover:scale-105"
            name="Book Hotel"
            onClick={makebooking}
          >
            Book Hotel
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
