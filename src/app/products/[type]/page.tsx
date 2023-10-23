import NoProducts from "@/app/components/NoProducts"
import PaginationBar from "@/app/components/PaginationBar"
import ProductCard from "@/app/components/Product"
import { prisma } from "@/lib/db/prisma"
import { Product } from "@prisma/client"

type Props = {
    params: {
        type: string
    },
    searchParams: {
        page: string
    }
}

const itemsPerPage = 9

export async function generateMetadata({ params: { type }, searchParams: { page = "1" } }: Props) {

    const typeProducts = await prisma.productType.findFirst({
        where: {
            name: type
        }
    })


    if (typeof typeProducts?.id === 'undefined')
        return {
            title: 'No products found'
        }

    const totalItemCount = await prisma.product.count({
            where: {
                typeId: typeProducts.id
            }
    })
    

    const totalPages = Math.ceil(totalItemCount / itemsPerPage)
    const currentPage = parseInt(page)
    
    const products = await prisma.product.findMany({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        where: {
            typeId: typeProducts.id
        },
        orderBy: {
            id: "desc"
        }
    })

    if(products.length === 0)
        return {
            title: 'No products found'
        }

    return {
        title: `${type}`
    }
}

export default async function page({ params: { type }, searchParams: { page = "1" } }: Props) {

    const typeProducts = await prisma.productType.findFirst({
        where: {
            name: type
        }
    })

    if (typeof typeProducts?.id === 'undefined')
        return (
            <NoProducts />
        )
    
    const currentPage = parseInt(page)

    const totalItemCount = await prisma.product.count({
        where: {
            typeId: typeProducts.id
        }
    })

    const totalPages = Math.ceil(totalItemCount / itemsPerPage)
    
    const products = await prisma.product.findMany({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        where: {
            typeId: typeProducts.id
        },
        orderBy: {
            id: "desc"
        }
    })

    if(products.length === 0)
        return (
            <NoProducts />
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
        <div className="flex flex-col items-center">
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        </div>
    </div>
  )
}
