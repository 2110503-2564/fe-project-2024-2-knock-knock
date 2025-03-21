'use client'
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import React from "react";

export default function Card({
  venueName,
  imgSrc,
  onRate,
}: {
  venueName: string;
  imgSrc: string;
  onRate?: (venueName: string, newRating: number) => void;
}) {
  const [rating, setValue] = React.useState<number | null>(0);
  return (
    <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px] text-black underline">
        {venueName}
      </div>
      {onRate ? (
        <Rating
          id={`${venueName} Rating`}
          name={`${venueName} Rating`}
          data-testid={`${venueName} Rating`}
          value={rating}
          onChange={(e, newValue) => {
            e.stopPropagation();
            e.preventDefault();
            setValue(newValue);
            onRate(venueName, newValue || 0);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      ) : ("")}
    </InteractiveCard>
  );
}
