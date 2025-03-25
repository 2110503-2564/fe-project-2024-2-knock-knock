import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import CardPanel from "@/components/CardPanel";
import DiscoveryGallery from "@/components/DiscoveryGallery";

export default function Home() {
  return (
    <main>
      <Banner />
      <DiscoveryGallery />
    </main>
  );
}
