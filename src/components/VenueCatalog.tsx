import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson>;
}) {
  const venueJsonReady = await venuesJson;
  return (
    <div className="text-black">
      Explore {(await venuesJson).count} fabulous venues in our venue catalog
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
        {(await venuesJson).data.map((VenueItem) => (
          <Link href={`/venue/${VenueItem.id}`} className="w-1/5">
            <Card
              key={VenueItem.name}
              venueName={VenueItem.name}
              imgSrc={VenueItem.picture}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
