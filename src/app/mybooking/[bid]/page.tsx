"use client";
import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function UpdateBooking() {
  const [bookingDate, setBookDate] = useState<Dayjs | null>(null);
  const [hotel, setHotel] = useState("MountainViewInn");
  const [user, setUser] = useState<string>("");
  const [nights, setNight] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);

  return (
    
    <main className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="text-3xl font-semibold text-sky-800 mb-6 border-b pb-2 text-center">
        Update Booking
      </div>

      <div className="w-full max-w-2xl space-y-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="text-md font-medium text-gray-700">
            Edit Your Reservation Details
        </div>
        <DateReserve
          onNightChange={(value: number) => setNight(value)}
          onDateChange={(value: Dayjs) => setBookDate(value)}
          onHotelChange={(value: string) => setHotel(value)}
        />

        <div className="pt-4 flex justify-end">
          <button
            className="rounded-md bg-yellow-500 hover:bg-yellow-600 px-5 py-2 text-white font-semibold shadow-md transition duration-300"
            name="Update Booking"
            onClick={() => {
              // TODO: Add update logic here
            }}
          >
            Update Booking
          </button>
        </div>
      </div>
    </main>
  );
}
