export default async function addBooking(
  hotelId: string,
  bookingDate: string,
  nights: number,
  token: string
) {
  const date = new Date(bookingDate);
  console.log(date);
  console.log(bookingDate)
  console.log(hotelId)
  const response = await fetch(
    `http://localhost:5000/api/v1/hotels/${hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingDate,
        nights,
      }),
    }
  );

  if (!response.ok) {
    console.log(response.status);
    throw new Error("Cannot create booking");
  }
  return await response.json();
}
