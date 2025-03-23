"use client"
import BookingList from "@/components/BookingList";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";
export default function MyBookingPage() {
  const { data: session } = useSession();
  const bookings = getBookings(session?.user.token || "");
  return (
    <main>
      <BookingList
        bookingsJson={bookings}
        token={session?.user.token || ""}
      ></BookingList>
    </main>
  );
}
