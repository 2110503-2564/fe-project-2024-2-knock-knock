import { NextRequest, NextResponse } from "next/server";

type Review = {
  hotelId: string;
  rating: number;
  comment: string;
};

let mockReviews: Review[] = [];

export async function POST(req: NextRequest) {
  const { hotelId, rating, comment } = await req.json();
  const review = { hotelId, rating, comment };
  mockReviews.push(review);
  return NextResponse.json(
    { message: "Review created", review },
    { status: 201 }
  );
}

export async function GET(req: NextRequest) {
  const hotelId = req.nextUrl.searchParams.get("hotelId");
  if (!hotelId) {
    return NextResponse.json({ error: "hotelId is required" }, { status: 400 });
  }
  const filtered = mockReviews.filter((r) => r.hotelId === hotelId);
  return NextResponse.json(filtered);
}
