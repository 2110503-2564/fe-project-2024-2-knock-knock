export default async function deleteBooking(bookingId: string, token: string) {
  const response = await fetch(
    `http://localhost:5000/api/v1/bookings/${bookingId}`,
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
