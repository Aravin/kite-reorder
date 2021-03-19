import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Kite Re-order</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex flex-row">
        <div className="">hi</div>
        <div className="">hi</div>
      </main>

      <footer>
        <a
          href="https://www.aravin.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          Design and Developed by Aravind A
        </a>
      </footer>
    </div>
  );
}
