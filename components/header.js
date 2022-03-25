import Image from "next/image";

export default function Header({ title }) {
  return (
    <>
      <Image src='/images/profile.jpg' alt="Shop logo" width={144} height={144}></Image>
      <h1 className='text-3xl'>{title ? title : 'Default title'}</h1>
    </>
  )
}