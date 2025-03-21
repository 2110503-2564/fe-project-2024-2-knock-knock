"use client";
import DateReserve from "@/components/DateReserve";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
  const [bookingDate, setBookDate] = useState<Dayjs | null>(null);
  const [hotel, setHotel] = useState("MountainViewInn");
  const [user, setUser] = useState<string>("");
  const [nights, setNight] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);

  const makebooking = () => {

    if (nights > 3) {
      setShowModal(true);
      return;
    }
    
    if (bookingDate && hotel && nights && user) {
      const item: BookingItem = {
        user: String(user),
        nights: nights,
        hotel: hotel,
        bookingDate: dayjs(
          dayjs(bookingDate).format("YYYY/MM/DD"),
          "YYYY/MM/DD"
        ).toDate(),
        createdAt: new Date(),
      };
      dispatch(addBooking(item));
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
            onNameChange={(value: string) => setUser(value)}
            onNightChange={(value: number) => setNight(value)}
            onDateChange={(value: Dayjs) => setBookDate(value)}
            onHotelChange={(value: string) => setHotel(value)}
          />
        </div>
        <button
          className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
          name="Book Hotel"
          onClick={makebooking}
        >
          Book Hotel
        </button>
      </main>

      {/* Modal for over 3 nights */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2 text-center">Sorry</h2>
            <p className="text-gray-700 text-center">
              You can't book more than 3 nights at once.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
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
