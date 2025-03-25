import Link from "next/link";

export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link href={pageRef} className={"flex items-center px-5 py-2 mx-1 rounded-md text-cyan-700 text-sm hover:bg-cyan-100 transition-all duration-200"}>
      {title}
    </Link>
  );
}
