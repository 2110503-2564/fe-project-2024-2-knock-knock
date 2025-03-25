export default async function updateBooking(
  bookingId: string,
  bookingDate: string,
  hotel: string,
  nights: number,
  token: string
) {
  const response = await fetch(
    `https://back-end-knock-knock.vercel.app/api/v1/bookings/${bookingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingDate,
        hotel,
        nights,
      }),
    }
  );
  console.log(response.status);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Cannot update booking");
  }

  return await response.json();
}
