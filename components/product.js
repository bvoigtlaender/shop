import Link from "next/link";

export default function Product({ id, name, price }) {
  return (
    <Link href={`products/${id}`}>
      <a className="w-full border-2 border-teal-600 bg-teal-50 p-2 rounded-xl">
        <h5 className="text-2xl text-teal-600">{name}</h5>
        <p className="">{price} $</p>
      </a>
    </Link>
  )
}