export default async function getHotel(id: string) {
  const response = await fetch(
    `https://back-end-knock-knock.vercel.app/api/v1/hotels/${id}`
  );
  console.log(id);
  console.log(response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
}
