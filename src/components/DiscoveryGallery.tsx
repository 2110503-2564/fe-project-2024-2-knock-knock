"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

const hotels = [
  { name: "Ocean View Resort", location: "Phuket, Thailand", image: "/img/discovery1.jpg" },
  { name: "Mountain Peak Lodge", location: "Chiang Mai, Thailand", image: "/img/discovery2.jpg" },
  { name: "City Central Hotel", location: "Bangkok, Thailand", image: "/img/discovery3.jpg" },
  { name: "Tropical Paradise", location: "Krabi, Thailand", image: "/img/discovery4.jpg" },
  { name: "Luxury Escape", location: "Hua Hin, Thailand", image: "/img/cover_hotel4.jpg" },
  { name: "Mountain Resort View", location: "Rayong, Thailand", image: "/img/cover_hotel3.jpg" },
  { name: "Ocean Paradise", location: "Krabi, Thailand", image: "/img/cover_hotel2.jpg" },
  { name: "Serene Riverside", location: "Kanchanaburi, Thailand", image: "/img/discovery5.jpg" },
  { name: "The Heritage Boutique", location: "Ayutthaya, Thailand", image: "/img/discovery6.jpg" },
  { name: "Beachside Bliss", location: "Pattaya, Thailand", image: "/img/discovery7.jpg" },
  { name: "Hilltop Haven", location: "Mae Hong Son, Thailand", image: "/img/discovery8.jpg" },
  { name: "Lakeside Retreat", location: "Khao Yai, Thailand", image: "/img/discovery9.jpg" },
];

export default function DiscoveryGallery() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
  };

  const handlePrev = () => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
  };

  return (
    <div className="w-full px-6 bg-gray-100">
      <div className="pt-8 pb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-cyan-700">
          Discover Our Hotels
        </h2>

        <div className="relative max-w-[1600px] mx-auto">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              768: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
            pagination={{ el: ".custom-pagination", clickable: true }}
            modules={[Navigation, Autoplay, Pagination]}
            className="w-full"
          >
            {hotels.map((hotel, i) => (
              <SwiperSlide key={i}>
                <div
                  onClick={() => router.push("/hotel")}
                  className="relative group rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 h-[250px]"
                >
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white via-white/80 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-700">{hotel.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute top-1/2 -translate-y-1/2 left-4 z-30 bg-black text-white rounded-full w-10 h-10 text-xl flex items-center justify-center shadow hover:bg-gray-800 transition"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute top-1/2 -translate-y-1/2 right-4 z-30 bg-black text-white rounded-full w-10 h-10 text-xl flex items-center justify-center shadow hover:bg-gray-800 transition"
          >
            ❯
          </button>

          <div
            className="custom-pagination mt-8 flex justify-center space-x-2 z-30 relative [&>span]:!bg-black [&>span]:!opacity-30 [&>span.swiper-pagination-bullet-active]:!opacity-100"
          />
        </div>
      </div>
    </div>
  );
}