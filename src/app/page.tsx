import Image from 'next/image'
import ProductCard from './components/Product'
import Hero from './components/Hero'
import { prisma } from '@/lib/db/prisma'
import { Product } from "@prisma/client"
import Link from 'next/link'

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
            <div className="flex items-end">
            <h2 className="text-4xl font-extrabold dark:text-white">{type.name}</h2>
            <Link className="font-medium text-indigo-600 hover:text-indigo-500 ml-3" href={`/products/${type.name}`}>
                        See more
                        <span aria-hidden="true"> &rarr;</span>
            </Link>
            </div>
              <div className="flex flex-wrap justify-center mb-8">
                {
                  type.products.slice(0, 3).map((product: Product) => (
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
