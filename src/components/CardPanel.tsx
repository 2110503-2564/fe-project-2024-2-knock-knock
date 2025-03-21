"use client";
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

const ratingReducer = (
  hotelList: Map<string, number>,
  action: { type: string; hotelName: string; rating?: number }
) => {
  const newhotelList = new Map(hotelList);
  switch (action.type) {
    case "add": {
      newhotelList.set(action.hotelName, action.rating ?? 0);
      return newhotelList;
    }
    case "remove": {
      newhotelList.delete(action.hotelName);
      return newhotelList;
    }
    default:
      return hotelList;
  }
};

export default function CardPanel() {
  let defaulthotel = new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);
  const [hotelList, dispatchRatings] = useReducer(ratingReducer, defaulthotel);

  const mockhotelRepo = [
    { vid: "001", name: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg" },
    { vid: "002", name: "Spark Space", imgSrc: "/img/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", imgSrc: "/img/grandtable.jpg" },
  ];

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          alignContent: "space-around",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {mockhotelRepo.map((hotel) => (
          <Link href={`/hotel/${hotel.vid}`} className="w-1/5">
            <Card
              key={hotel.name}
              hotelName={hotel.name}
              imgSrc={hotel.imgSrc}
              onRate={(hotelName, newRating) =>
                dispatchRatings({ type: "add", hotelName, rating: newRating })
              }
            />
          </Link>
        ))}
      </div>

      <div className="w-full text-xl font-medium text-black">
        hotel List With Ratings:{hotelList.size}
      </div>
      {Array.from(hotelList.entries()).map(([hotelName, rating]) => (
        <div
          key={hotelName}
          data-testid={hotelName}
          className="items-center space-x-2 text-black"
          onClick={() => dispatchRatings({ type: "remove", hotelName, rating })}
        >
          {hotelName} : {rating}
        </div>
      ))}
    </div>
  );
}
