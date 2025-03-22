"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/img/cover_hotel.jpg",
    "/img/cover_hotel.jpg",
    "/img/cover_hotel.jpg",
    "/img/cover_hotel.jpg",
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();
  console.log("Session:", session?.user);

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />

      <div
        className={`${styles.bannerText} text-center py-12 px-6 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg`}
      >
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          Your perfect stay, just a booking away.
        </h1>
        <h3 className="text-2xl font-light italic leading-relaxed drop-shadow-md">
          Whether it’s a lavish escape, a cozy hideaway, or a business retreat,
          we help you find the ideal hotel for every journey.
        </h3>
      </div>

      {session ? (
        <div className="z-30 absolute right-10 top-5 font-semibold text-cyan-800 text-xl">
          Welcome {session.user?.name}
        </div>
      ) : null}
      <button
        className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-3 px-6 m-4 rounded-full z-30 absolute bottom-4 right-4 
                  shadow-md transition-all duration-300 ease-in-out 
                  hover:bg-cyan-600 hover:text-white hover:border-transparent hover:scale-105 
                  focus:ring-2 focus:ring-cyan-400 active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          router.push("/hotel");
        }}
      >
        Select Hotel
      </button>
    </div>
  );
}
