'use client'

type Props = {
    subTotal: number,
    shipping: number
}

export default function Bill({ subTotal, shipping }: Props) {

    const total = subTotal + shipping

  return (
    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
        <div className="mt-3 mb-6 pb-6 border-b border-gray-200 text-gray-800">
            <div className="w-full flex mb-3 items-center">
                <div className="flex-grow">
                    <span className="text-gray-600">Subtotal</span>
                </div>
                <div className="pl-3">
                    <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </div>
            </div>
            <div className="w-full flex items-center">
                <div className="flex-grow">
                    <span className="text-gray-600">Shipping</span>
                </div>
                <div className="pl-3">
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
            </div>
        </div>
        <div className="pb-3 border-b border-gray-200 md:border-none text-gray-800 text-xl">
            <div className="w-full flex items-center">
                <div className="flex-grow">
                    <span className="text-gray-600">Total</span>
                </div>
                <div className="pl-3">
                    <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
