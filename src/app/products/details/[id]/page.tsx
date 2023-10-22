import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import ProductGallery from "./components/ProductGallery"
import ProductInfo from "./components/ProductInfo"

type Props = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params: { id }}: Props) {

    const product = await prisma.product.findUnique({where: {id}})
    if (!product) {
        return {
            title: 'Product Not Found'
        }
    }

    return {
        title: product.name,
        description: product.desc
    }
}

export default async function ProductPage({ params: { id }}: Props) {
    const product = await prisma.product.findUnique({where: {id}})
    if (!product) notFound()

    const { images } = product

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4 lg:items-center">
                    <div className="md:flex-1 px-4">
                        <ProductGallery images={images} />
                    </div>
                    <ProductInfo product={product} />
                </div>
            </div>
        </div>
    )
}
