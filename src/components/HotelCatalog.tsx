import Link from "next/link";
import Card from "./Card";

export default async function HotelCatalog({
  hotelsJson,
}: {
  hotelsJson: Promise<HotelJson>;
}) {
  const hotelJsonReady = await hotelsJson;

  return (
    <div className="text-black px-6 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Explore {hotelJsonReady.count} Fabulous Hotels in Our Catalog
      </h1>

      <div
        className={`grid gap-6 ${
          hotelJsonReady.data.length === 3
            ? "grid-cols-3 justify-center"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {hotelJsonReady.data.map((HotelItem) => (
          <Link
            key={HotelItem._id}
            href={`/hotel/${HotelItem._id}`}
            className="transform transition duration-300 hover:scale-105"
          >
            <Card
              hotelName={HotelItem.name}
              imgSrc={HotelItem.picture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
