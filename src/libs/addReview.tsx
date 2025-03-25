export default async function addReview(
  hotelId: string,
  rating: number,
  comment: string,
  token: string
) {
  const response = await fetch(
    `http://newhotels-env.eba-qbmbbabk.us-east-1.elasticbeanstalk.com/api/v1/hotels/${hotelId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating,
        comment,
      }),
    }
  );

  if (!response.ok) {
    console.log(response.status);
    throw new Error("Cannot add review");
  }

  return await response.json();
}
