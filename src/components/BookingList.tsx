"use client";
import { useAppSelector } from "@/redux/store";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
  const hotelItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {hotelItems.length == 0
        ? "No Hotel Booking"
        : hotelItems.map((bookItem) => (
            <div
              className="bg-slate-200 rounded px-5 mx-5 py-2 my-2 text-black"
              key={bookItem.nameLastname}
            >
              <div className="text-xl">
                Name-Lastname : {bookItem.nameLastname}
              </div>
              <div className="text-xl">Contact-Number : {bookItem.tel}</div>
              <div className="text-xl">Hotel : {bookItem.hotel}</div>
              <div className="text-xl">Book-Date : {bookItem.bookingDate.toString()}</div>
              <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                name="Book Hotel"
                onClick={() => dispatch(removeBooking(bookItem))}
              >
                Remove from list
              </button>
            </div>
          ))}
    </>
  );
}
