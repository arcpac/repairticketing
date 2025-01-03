import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black bg-home-img bg-cover bg-center">
      <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl rounded-md bg-black/80">
          <h1>Ton&apos;s Repair Shop</h1>
          <address>123 Parramatta NSW 2150</address>
          <Link href="12321332" className="hover:underline">
            123123213
          </Link>
        </div>
      </main>
    </div>
  );
}
