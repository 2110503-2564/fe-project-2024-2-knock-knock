"use client";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
  const hotelItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full flex flex-col items-center px-6 py-10">
      {hotelItems.length === 0 ? (
        <div className="text-xl text-gray-600">No Hotel Booking</div>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {hotelItems.map((bookItem) => (
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
              <div className="pt-2">
                <button
                  onClick={() => dispatch(removeBooking(bookItem))}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium shadow-md hover:shadow-lg transition duration-300"
                >
                  Remove from list
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
