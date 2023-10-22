import ProductCard from "@/app/components/Product"
import { prisma } from "@/lib/db/prisma"
import { Product } from "@prisma/client"

type Props = {
    params: {
        type: string
    }
}

export async function generateMetadata({ params: { type }}: Props) {

    const typeProducts = await prisma.productType.findFirst({
        where: {
            name: type
        },
        include: { products: true }
    })

    const products = typeProducts?.products

    if(typeof products === 'undefined' || products?.length === 0) {
        return {
            title: 'No products found'
        }
    }

    return {
        title: `${type}`
    }
}

export default async function page({ params: { type }}: Props) {

    const typeProducts = await prisma.productType.findFirst({
        where: {
            name: type
        },
        include: { products: true }
    })

    const products = typeProducts?.products

    if(typeof products === 'undefined' || products?.length === 0)
        return (
            <div className="flex h-screen justify-center items-center">
                <h2 className="text-3xl font-medium text-gray-900">
                    No products found
                </h2>
            </div>
        )

  return (
    <div>
        <h2 className="text-3xl font-extrabold dark:text-white">{type}</h2>
          <div className="flex flex-wrap items-start mb-8">
            {
                products.map((product: Product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
            ))}
        </div>
    </div>
  )
}
