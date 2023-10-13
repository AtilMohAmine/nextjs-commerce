import Image from 'next/image'
import Product from './components/Product'
import Hero from './components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-row">
      <Product product={{
          id: 1,
          name: "Nike Air MX Super 2500 - Red",
          image: "",
          price: 100,
          discountPrice: 50,
          discountRate: 50
        }}
      />
      <Product product={{
          id: 1,
          name: "Just for test",
          image: "",
          price: 100,
        }}
      />
      </div>
    </>
  )
}
