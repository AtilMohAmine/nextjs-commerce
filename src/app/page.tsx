import Image from 'next/image'
import Product from './components/Product'
import Hero from './components/Hero'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })

  const productTypes = await prisma.productType.findMany({
    orderBy: {id: "desc"}
  })

  const typeMap = {};
  productTypes.forEach((type) => {
    typeMap[type.id] = type.name;
  });

  const productsByType = {};

  products.forEach((product) => {
    const type = typeMap[product.type];
    if (!productsByType[type]) {
      productsByType[type] = [];
    }
    productsByType[type].push(product);
  });

  return (
    <>
      <Hero />
      <div className='mt-10'>
      {
        Object.keys(productsByType).map((type) => (
          <div key={type}>
            <h2 className="text-4xl font-extrabold dark:text-white">{type}</h2>
              <div className="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
                {productsByType[type].map((product: Product) => (
                    <Product 
                      key={product.id}
                      product={product}
                    />
                ))}
              </div>
          </div>
        ))
      }
      </div>
    </>
  )
}
