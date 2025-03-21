import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link"; // ✅ Use next/link, not @mui/material/Link

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.menucontainer}>
      {session ? (
        <Link href="/api/auth/signout">
          <div className="flex items-center px-5 text-cyan-600 text-sm">
            Sign-Out of {session.user?.name}
          </div>
        </Link>
      ) : (
        <Link href="/api/auth/signin">
          <div className="flex items-center px-5 text-cyan-600 text-sm">
            Sign-In
          </div>
        </Link>
      )}
      <Link href="/mybooking">
        <div className="flex items-center px-5 text-cyan-600 text-sm">
          My Booking
        </div>
      </Link>
      <Link href="/"> 
        <div className="flex items-center px-5 text-cyan-600 text-sm">
          Home
        </div>
      </Link>
      <div className="absolute right-0 flex flex-row h-full">
        <TopMenuItem title="Menu Item Booking" pageRef="/booking" />
        <Image
          src={"/img/logo_hotel.jpg"}
          className={styles.logoimg}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
      </div>
    </div>
  );
}
