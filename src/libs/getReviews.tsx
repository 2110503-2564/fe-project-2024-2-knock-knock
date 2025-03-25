export default async function getReviews(hotelId: string) {
  const response = await fetch(
    `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${hotelId}/reviews`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response.status);
    throw new Error("Cannot fetch reviews");
  }

  return await response.json();
}
