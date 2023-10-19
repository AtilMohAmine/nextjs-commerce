'use server'

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export async function addToCart(productId: string, color?: string, size?: string) {
    const cart = await getCart() ?? await createCart()

    const product = cart.items.find((item) => item.productId == productId && item.color == color && item.size == size)

    if (product) {
        await prisma.cartItem.update({
            where: { id: product.id },
            data: { quantity: { increment: 1 } }
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity: 1,
                color,
                size
            }
        })
    }

    revalidatePath("/products/[id]")
}