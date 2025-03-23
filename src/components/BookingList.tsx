import deleteBooking from "@/libs/deleteBooking";
import BookingListClient from "./BookingListClient";
export default async function BookingList({
  bookingsJson,
  token,
}: {
  bookingsJson: Promise<BookingJson>;
  token: string;
}) {
  const bookingsJsonReady = await bookingsJson;
  return (
    <BookingListClient initialBookings={bookingsJsonReady || []} token={token} />
  );
}
