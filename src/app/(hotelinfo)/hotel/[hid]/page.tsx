import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";

export default async function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const hotelDetail = await getHotel(params.hid);

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium text-black">
        {hotelDetail.data.name}
      </h1>
      <div className="flex flex-row my-5">
        <Image
          src={hotelDetail.data.picture}
          alt="Hotel Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5 text-black">
          <div className="text-md mx-5 text-black text-left">
            Name: {hotelDetail.data.name}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Address: {hotelDetail.data.address}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Tel: {hotelDetail.data.telephone}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Price: {hotelDetail.data.price}{" "}
          </div>
          <div className="text-md mx-5 text-black text-left">
            Promotion: {hotelDetail.data.promotion}{" "}
          </div>
          <Link
            href={`/booking?id=${params.hid}&model=${hotelDetail.data.model}`}
          >
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
              name="Book Hotel"
            >
              Book Hotel
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// export async function generateStaticParams() {
//   return [{ hid: "001" }, { hid: "002" }, { hid: "003" }];
// }
