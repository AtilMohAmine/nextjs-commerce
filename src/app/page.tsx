import Image from 'next/image'
import ProductCard from './components/Product'
import Hero from './components/Hero'
import { prisma } from '@/lib/db/prisma'
import { Product } from "@prisma/client"

export default async function Home() {

  const productTypes = await prisma.productType.findMany({
    include: { products: true },
    orderBy: { id: "asc" }
  })

  return (
    <>
      <Hero />
      <div className='mt-10'>
      {
        productTypes.map((type) => (
          (type.products.length != 0) && (
          <div key={type.id}>
            <h2 className="text-4xl font-extrabold dark:text-white">{type.name}</h2>
              <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
                {
                  type.products.map((product: Product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                      />
                  ))
                }
              </div>
          </div>
          )
        ))
      }
      </div>
    </>
  )
}
