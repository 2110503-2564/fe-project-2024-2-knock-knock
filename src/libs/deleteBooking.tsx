export default async function deleteBooking(bookingId: string, token: string) {
  const response = await fetch(
    `https://back-end-knock-knock.vercel.app/api/v1/bookings/${bookingId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Cannot delete booking");
  }

  return await response.json();
}
