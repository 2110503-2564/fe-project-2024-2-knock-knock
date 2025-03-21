"use client";
import DateReserve from "@/components/DateReserve";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [venue, setVenue] = useState("Bloom");
  const [nameLastname, setNameLastName] = useState<string>("");
  const [tel, setTel] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const makebooking = () => {
    if (bookDate && venue && tel && nameLastname) {
      const item: BookingItem = {
        nameLastname: String(nameLastname),
        tel: String(tel),
        venue: venue,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      };
      dispatch(addBooking(item));
    }
  };
  return (
    <main className="w-[100%] flex flex-col item-center space-y-4">
      <div className="text-xl font-medium text-black">Venue Booking</div>
      <div className="w-fit space-y-2 ">
        <div className="text-md text-left text-gray-600">
          Pick-Up Date and Location
        </div>
        <DateReserve
          onNameChange={(value: string) => {
            setNameLastName(value);
          }}
          onTelChange={(value: string) => {
            setTel(value);
          }}
          onDateChange={(value: Dayjs) => {
            setBookDate(value);
          }}
          onVenueChange={(value: string) => {
            setVenue(value);
          }}
        />
      </div>
      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
        name="Book Venue"
        onClick={makebooking}
      >
        Book Venue
      </button>
    </main>
  );
}
