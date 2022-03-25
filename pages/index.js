import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Product from '../components/product';
import Header from '../components/header';

export default function HomePage({ products }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Shop" />
      <div className='flex flex-col items-center px-12 space-y-5'>
        {products && products.data.map(({ id, attributes }) => (
          <Product key={id} id={id} name={attributes.name} price={attributes.price}></Product>
        ))}
      </div>

      <h2 className='text-xl'><Link href="/about">About</Link></h2>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:1337/api/products`, {
    headers: {
      Authorization: 'bearer d569920ef45ae4982d97cd3e4d2ceca7b988e387f7a40f0faf8d16d54c3347de610ada5bd916bc2e7a36b82ee632b4e106719f9d5c0b41157c75d595de8f934eba673c7addd04a8e8a28429b827b47f8e0a5243be27679b120b6d9a48d873ba5c7e5fcd56bd4efaf70802500922bbc04454a91bfa1c44d5c10e6e60909767f9e'
    }
  })
  const products = await res.json();
  return {
    props: {
      products
    },
    revalidate: 10,
  }
}