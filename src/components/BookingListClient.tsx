"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteBooking from "@/libs/deleteBooking";

export default function BookingListClient({
  initialBookings,
  token,
}: {
  initialBookings: BookingJson;
  token: string;
}) {
  const [bookings, setBookings] = useState(initialBookings.data);
  const handleDelete = async (id: string) => {
    await deleteBooking(id, token);
    setBookings(bookings.filter((item) => item._id !== id));
  };
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center px-6 py-10">
      {bookings.length === 0 ? (
        <div className="text-xl text-gray-600">No Hotel Booking</div>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {bookings.map((bookItem) => (
            <div
              key={bookItem.user}
              className="bg-white rounded-2xl shadow-md p-6 text-black space-y-3 transition duration-300 hover:shadow-lg"
            >
              <div className="text-lg font-medium">
                <span className="text-gray-600">Name - Lastname:</span>{" "}
                {bookItem.user}
              </div>
              <div className="text-lg font-medium">
                <span className="text-gray-600">Nights:</span> {bookItem.nights}
              </div>
              <div className="text-lg font-medium">
                <span className="text-gray-600">Hotel:</span> {bookItem.hotel}
              </div>
              <div className="text-lg font-medium">
                <span className="text-gray-600">Book Date:</span>{" "}
                {new Date(bookItem.bookingDate).toLocaleDateString()}
              </div>
              <div className="pt-2 flex space-x-3">
                <button
                  onClick={() => {
                    handleDelete(bookItem._id);
                  }}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium shadow-md hover:shadow-lg transition duration-300 shadow-md transform hover:scale-105"
                >
                  Remove from list
                </button>
                <button
                  onClick={() => {
                    router.push(`/mybooking/${bookItem._id}`)
                  }}
                  className="px-5 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium shadow-md hover:shadow-lg transition duration-300 shadow-md transform hover:scale-105"
                >
                  Update Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
