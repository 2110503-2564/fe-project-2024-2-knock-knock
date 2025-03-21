import { resolve } from "path";

export default async function getVenues() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = await fetch(
    "http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return await response.json();
}
