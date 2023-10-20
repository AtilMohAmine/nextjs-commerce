'use server'

import { getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export async function removeProductFromCart(id: string) {
    const cart = await getCart()
    if(!cart)
        return null
    
    const cartItem = cart.items.find((item) => item.id == id )
    
    if(cartItem) {
        await prisma.cartItem.delete({
            where: { id: cartItem.id }
        })
    }

    revalidatePath('/cart')
}