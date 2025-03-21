import Link from "next/link";
import Card from "./Card";

export default async function HotelCatalog({
  hotelsJson,
}: {
  hotelsJson: Promise<HotelJson>;
}) {
  const hotelJsonReady = await hotelsJson;
  return (
    <div className="text-black">
      Explore {(await hotelsJson).count} fabulous hotels in our hotel catalog
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
        {(await hotelsJson).data.map((HotelItem) => (
          <Link href={`/hotel/${HotelItem._id}`} className="w-1/5">
            <Card
              key={HotelItem.name}
              hotelName={HotelItem.name}
              imgSrc={HotelItem.picture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
