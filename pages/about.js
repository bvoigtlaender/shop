import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1 className="text-3xl">About</h1>
      <p>This is a generic storefront built with Next.js, Keystone, Tailwind and Mollie</p>
    </>
  )
}