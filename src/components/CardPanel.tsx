"use client";
import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

const ratingReducer = (
  venueList: Map<string, number>,
  action: { type: string; venueName: string; rating?: number }
) => {
  const newVenueList = new Map(venueList);
  switch (action.type) {
    case "add": {
      newVenueList.set(action.venueName, action.rating ?? 0);
      return newVenueList;
    }
    case "remove": {
      newVenueList.delete(action.venueName);
      return newVenueList;
    }
    default:
      return venueList;
  }
};

export default function CardPanel() {
  let defaultVenue = new Map<string, number>([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0],
  ]);
  const [venueList, dispatchRatings] = useReducer(ratingReducer, defaultVenue);

  const mockVenueRepo = [
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
        {mockVenueRepo.map((venue) => (
          <Link href={`/venue/${venue.vid}`} className="w-1/5">
            <Card
              key={venue.name}
              venueName={venue.name}
              imgSrc={venue.imgSrc}
              onRate={(venueName, newRating) =>
                dispatchRatings({ type: "add", venueName, rating: newRating })
              }
            />
          </Link>
        ))}
      </div>

      <div className="w-full text-xl font-medium text-black">
        Venue List With Ratings:{venueList.size}
      </div>
      {Array.from(venueList.entries()).map(([venueName, rating]) => (
        <div
          key={venueName}
          data-testid={venueName}
          className="items-center space-x-2 text-black"
          onClick={() => dispatchRatings({ type: "remove", venueName, rating })}
        >
          {venueName} : {rating}
        </div>
      ))}
    </div>
  );
}
