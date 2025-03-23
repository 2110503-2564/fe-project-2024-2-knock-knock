export default async function updateBooking(
  bookingId: string,
  bookingDate: string,
  hotel: string,
  nights: number,
  token: string
) {
  const response = await fetch(
    `http://localhost:5000/api/v1/bookings/${bookingId}`,
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
