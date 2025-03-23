export default async function getBookings(token: string) {
  const response = await fetch(
    "http://localhost:5000/api/v1/bookings/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.log(response.status);
    throw new Error("Cannot retrieve bookings");
  }

  return await response.json();
}
