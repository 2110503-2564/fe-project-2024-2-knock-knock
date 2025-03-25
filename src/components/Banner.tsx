"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";
import DiscoveryGallery from "./DiscoveryGallery";

export default function Banner() {
  const covers = [
    "/img/cover_hotel.jpg",
    "/img/cover_hotel2.jpg",
    "/img/cover_hotel3.jpg",
    "/img/cover_hotel4.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setIsVisible(false);

      // Wait for fade out to finish before changing image
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % covers.length);
        setIsVisible(true); // Fade in new image
      }, 500); // 0.5 second = matches the fade duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={covers[index]}
        alt="cover"
        fill
        priority
        className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-20"
        }`}
      />

      <div
        className={`${styles.bannerText}  ml-20 py-12 px-6 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg`}
      >
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          Your perfect stay, just a booking away.
        </h1>
        <h3 className="text-2xl font-light italic leading-relaxed drop-shadow-md">
          Whether it’s a lavish escape, a cozy hideaway, or a business retreat,
          we help you find the ideal hotel for every journey.
        </h3>
      </div>

      {session && (
        <div className="z-30 absolute right-10 top-5 text-center px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold drop-shadow-md">
            Welcome {session.user?.name}
          </h2>
        </div>
      )}

      <button
        className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-3 px-6 m-4 rounded-full z-30 absolute bottom-10 right-4 
                shadow-md transition-all duration-300 ease-in-out 
                hover:bg-cyan-600 hover:text-white hover:border-transparent hover:scale-105 
                focus:ring-2 focus:ring-cyan-400 active:scale-95"
        onClick={() => router.push("/hotel")}
      >
        Select Hotel
      </button>
    </div>
  );
}
