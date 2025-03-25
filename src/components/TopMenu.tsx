'use client';

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import styles from "./topmenu.module.css";

import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaCalendarCheck,
  FaConciergeBell,
} from "react-icons/fa";

export default function TopMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <div className={styles.toggleButton} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={30} /> : <FaBars size={25} />}
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuItems}>
          {session ? (
            <button onClick={() => signOut()} className={styles.linkItem}>
              <FaSignOutAlt className={styles.icon} />
              Sign-Out of {session.user?.name}
            </button>
          ) : (
            <button onClick={() => signIn()} className={styles.linkItem}>
              <FaSignInAlt className={styles.icon} />
              Sign-In
            </button>
          )}

          <Link href="/mybooking" className={styles.linkItem}>
            <FaCalendarCheck className={styles.icon} />
            My Booking
          </Link>

          <Link href="/booking" className={styles.linkItem}>
            <FaConciergeBell className={styles.icon} />
            Booking
          </Link>

          <Link href="/" className={`${styles.linkItem}`}>
            <FaHome className={styles.icon} />
            Home
          </Link>
        </div>

        <div className={styles.logoWrapper}>
          <Image
            src="/img/logo_hotel.jpg"
            alt="logo"
            width={50}
            height={50}
            className={styles.logoimg}
          />
        </div>
      </div>
    </>
  );
}
