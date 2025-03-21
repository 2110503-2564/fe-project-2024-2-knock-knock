export default async function getVenue(id: string) {
  const response = await fetch(
    `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return await response.json();
}
