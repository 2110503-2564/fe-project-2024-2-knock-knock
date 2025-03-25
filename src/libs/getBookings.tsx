export default async function getBookings(token: string) {
  const response = await fetch(
    "https://back-end-knock-knock.vercel.app/api/v1/bookings/",
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
