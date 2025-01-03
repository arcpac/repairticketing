import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="">
      <div className="flex mx-auto flex-col p-5 justify-center items-center">
        <h2>Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/404.png"
          width={300}
          height={300}
          priority={true}
          title="Page not found"
          alt="Page not found"
        />
      </div>
    </div>
  );
}
