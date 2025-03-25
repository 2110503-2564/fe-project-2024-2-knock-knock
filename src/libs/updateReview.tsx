export default async function updateReview(
  reviewId: string,
  rating: number,
  comment: string,
  token: string
) {
  const response = await fetch(
    `https://back-end-knock-knock.vercel.app/api/v1/reviews/${reviewId}`,
    {
      method: "PUT",
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
  console.log(response.status);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Cannot update review");
  }

  return await response.json();
}
