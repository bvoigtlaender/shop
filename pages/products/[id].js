import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/header";

export default function Product({ id, name, price, images, description }) {
  const handleBuy = async () => {
    const payment = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        amount: price,
        description,
      })
    })

    const body = await payment.json();
    window.open(body.checkoutUrl, '_self');
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Header title="Shop" />
      <h1 className="text-3xl">{name}</h1>
      <p>{description}</p>
      <p>{price} $</p>
      {images?.data && images.data.map(image => (
        <Image key={image.id} height={image.attributes.height} width={image.attributes.width} src={`http://localhost:1337${image.attributes.url}`} alt={image.attributes.caption}></Image>
      ))}
      <button onClick={handleBuy}>Buy</button>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:1337/api/products?pagination[pageSize]=100`, {
    headers: {
      Authorization: 'bearer d569920ef45ae4982d97cd3e4d2ceca7b988e387f7a40f0faf8d16d54c3347de610ada5bd916bc2e7a36b82ee632b4e106719f9d5c0b41157c75d595de8f934eba673c7addd04a8e8a28429b827b47f8e0a5243be27679b120b6d9a48d873ba5c7e5fcd56bd4efaf70802500922bbc04454a91bfa1c44d5c10e6e60909767f9e'
    }
  })
  const products = await res.json();
  return {
    paths: products.data.map(product => ({ params: { id: product.id.toString() } })),
    fallback: 'blocking',

  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:1337/api/products/${params.id}?populate=*`, {
    headers: {
      Authorization: 'bearer d569920ef45ae4982d97cd3e4d2ceca7b988e387f7a40f0faf8d16d54c3347de610ada5bd916bc2e7a36b82ee632b4e106719f9d5c0b41157c75d595de8f934eba673c7addd04a8e8a28429b827b47f8e0a5243be27679b120b6d9a48d873ba5c7e5fcd56bd4efaf70802500922bbc04454a91bfa1c44d5c10e6e60909767f9e'
    }
  })
  const product = await res.json();
  return {
    props: {
      id: params.id,
      ...product.data.attributes,
    },
    revalidate: 10,
  }
}