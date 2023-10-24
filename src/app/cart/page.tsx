import { getCart } from "@/lib/db/cart"
import Link from "next/link"
import CartItem from "./CartItem"

export default async function Cart() {

    const cart = await getCart()
    
  return (
    <div>
        {
            (cart?.size || 0) == 0
            ? (
                <div className="flex h-screen justify-center items-center">
                    <h2 className="text-3xl font-medium text-gray-900">
                        Your cart is empty
                    </h2>
                </div>
            )
            : (
                <div className="flex h-full flex-col bg-white">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <h2 className="text-3xl font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>

                <div className="mt-12">
                    <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {
                            cart?.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))
                        }

                    </ul>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${cart?.subtotal.toFixed(2) || 0}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                    or 
                    <Link className="font-medium text-indigo-600 hover:text-indigo-500 ml-1" href="/">
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                    </p>
                </div>
                </div>
            </div> )
        }        
     </div>

  )
}
