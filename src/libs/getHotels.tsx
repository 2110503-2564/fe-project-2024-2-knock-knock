export default async function getHotels() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = await fetch(
    "https://back-end-knock-knock.vercel.app/api/v1/hotels"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return await response.json();
}
