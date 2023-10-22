'use client'

import { CartItem, Prisma } from "@prisma/client"
import Link from "next/link";
import { removeProductFromCart } from "./actions"
import { useTransition } from "react";

type ItemWithProducts = Prisma.CartItemGetPayload<{
    include: { product: true };
}>

type Props = {
    item: ItemWithProducts
}

export default function CartItem({ item }: Props) {
    const [isPending, startTransition] = useTransition()

  return (
    <li className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover object-center" />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
            <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                <Link href={`/products/details/${item.productId}`}>{item.product.name}</Link>
                </h3>
                <p className="ml-4">${item.product.discountPrice ? item.product.discountPrice : item.product.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{item.product.desc}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Qty {item.quantity}</span>
                    {
                        item.color && (<span className="text-gray-500 ml-2">Color <button className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></button></span>)
                    }
                    {
                        item.size && (<span className="text-gray-500 ml-2">Size {item.size}</span>)
                    }
                </div>
            <div className="flex">
                <button type="button" 
                    className="font-medium text-indigo-600 hover:text-indigo-500" 
                    disabled={isPending} 
                    onClick={() => {
                        startTransition(async () => { 
                            await removeProductFromCart(item.id)
                        })
                    }}
                >Remove</button>
            </div>
            </div>
        </div>
    </li>
  )
}
