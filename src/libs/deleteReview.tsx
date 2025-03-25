export async function deleteReview(reviewId: string, token: string) {
    const response = await fetch(
      `https://back-end-knock-knock.vercel.app/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.status);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Cannot delete review");
    }
    return await response.json();
  }