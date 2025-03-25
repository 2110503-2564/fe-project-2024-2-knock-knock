export default async function getHotel(id: string) {
  const response = await fetch(
    `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${id}`
  );
  console.log(id);
  console.log(response.status);
  if (!response.ok) {
    throw new Error("Failed to fetch hotel");
  }
  return await response.json();
}
