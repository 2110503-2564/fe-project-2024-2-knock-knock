import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  const linkClass =
    "flex items-center px-5 py-2 mx-1 rounded-md text-cyan-700 text-sm hover:bg-cyan-100 transition duration-300transform hover:scale-105";

  return (
    <div className={styles.menucontainer}>
      {session ? (
        <Link href="/api/auth/signout">
          <div className={linkClass}>
            Sign-Out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className={linkClass}>Sign-In</div>
        </Link>
      )}
      <Link href="/mybooking">
        <div className={linkClass}>My Booking</div>
      </Link>
      <Link href="/">
        <div className={linkClass}>Home</div>
      </Link>
      <div className="absolute right-0 flex flex-row h-full items-center pr-4 ">
        <TopMenuItem title="Menu Item Booking" pageRef="/booking" />
        <Image
          src={"/img/logo_hotel.jpg"}
          className={styles.logoimg}
          priority
          alt="logo"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}
