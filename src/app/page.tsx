import Image from 'next/image'
import Product from './components/Product'
import Hero from './components/Hero'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })

  return (
    <>
      <Hero />
      <div className="flex flex-row">
      { 
        products.map(product => (
                <Product 
                  key={product.id}
                  product={product}
              />
        )) 
      }
      </div>
    </>
  )
}
