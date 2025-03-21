import Image from "next/image";
import getVenue from "@/libs/getVenue";
import Link from "next/link";

export default async function VenueDetailPage({
  params,
}: {
  params: { vid: string };
}) {
  const venueDetail = await getVenue(params.vid);

  // const mockVenueRepo = new Map();
  // mockVenueRepo.set("001", {
  //   name: "The Bloom Pavilion",
  //   imgSrc: "/img/bloom.jpg",
  // });
  // mockVenueRepo.set("002", {
  //   name: "Spark Space",
  //   imgSrc: "/img/sparkspace.jpg",
  // });
  // mockVenueRepo.set("003", {
  //   name: "The Grand Table",
  //   imgSrc: "/img/grandtable.jpg",
  // });
  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium text-black">
        {venueDetail.data.name}
      </h1>
      <div className="flex flex-row my-5">
        <Image
          src={venueDetail.data.picture}
          alt="Venue Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5 text-black">
          <div className="text-md mx-5 text-black text-left">
            Name: {venueDetail.data.name}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Address: {venueDetail.data.address}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            District: {venueDetail.data.district}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Postal Code: {venueDetail.data.postalcode}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Tel: {venueDetail.data.tel}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Daily Rate: {venueDetail.data.dailyrate}{" "}
          </div>
          <Link
            href={`/booking?id=${params.vid}&model=${venueDetail.data.model}`}
          >
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
              name="Book Venue"
            >
              Book Venue
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//   return [{ vid: "001" }, { vid: "002" }, { vid: "003" }];
// }
