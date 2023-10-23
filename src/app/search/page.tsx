import { prisma } from "@/lib/db/prisma"
import { Product } from "@prisma/client"
import ProductCard from "../components/Product"
import PaginationBar from "../components/PaginationBar"

type Props = {
    searchParams: {
        query: string,
        page: string
    }
}

const itemsPerPage = 9

export async function generateMetadata({ searchParams: { query, page = "1" }}: Props) {

    const currentPage = parseInt(page)

    const products = await prisma.product.findMany({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { desc: { contains: query, mode: "insensitive" } },
            ]
        }, 
        orderBy: {id: "desc"}
    })

    if(products.length === 0) {
        return {
            title: 'No products found'
        }
    }

    return {
        title: `Results for ${query}`
    }
}

export default async function page({ searchParams: { query, page = "1" } }: Props) {
    const totalItemCount = await prisma.product.count({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { desc: { contains: query, mode: "insensitive" } },
            ]
        }
    })
    const totalPages = Math.ceil(totalItemCount / itemsPerPage)
    const currentPage = parseInt(page)

    const products = await prisma.product.findMany({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { desc: { contains: query, mode: "insensitive" } },
            ]
        }, 
        orderBy: {id: "desc"}
    })

    if(products.length === 0)
        return (
            <div className="flex h-screen justify-center items-center">
                <h2 className="text-3xl font-medium text-gray-900">
                    No products found
                </h2>
            </div>
        )

  return (
    <div>
        <h2 className="text-3xl font-extrabold dark:text-white">Results for {query}</h2>
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
            <PaginationBar currentPage={currentPage} totalPages={totalPages} queryString={`query=${query}`} />
        </div>
    </div>
  )
}
