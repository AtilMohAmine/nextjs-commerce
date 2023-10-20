"use client"

import { useState, useTransition } from "react"
import { addToCart } from "../actions"
import { useRouter } from "next/navigation"
import { Product } from "@prisma/client"

type Props = {
    product: Product
}

export default function ProductInfo({ product }: Props) {

    const router = useRouter()
    
    const { id, name, desc, price, discountPrice, discountRate, colors, sizes } = product

    const [selectedColor, selectColor] = useState((typeof colors !== 'undefined') ? colors[0] : null)
    const [selectedSize, selectSize] = useState((typeof sizes !== 'undefined') ? sizes[0] : null)
    const [quantity, setQuantity] = useState(1)
    const [isPending, startTransition] = useTransition()

    if(quantity < 1)
        setQuantity(1)

  return (
    <div className="md:flex-1 px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{name}</h1>
        {
            typeof colors !== 'undefined' && colors.length !== 0 && (
            <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                <div className="flex items-center mt-2">
                    {
                        colors.map((color, index) => (
                            <div key={index} className="mr-2 w-9 h-9 p-1" style={{border: (selectedColor == color) ? '2px solid black' : '2px solid white', borderRadius: '50%'}}>
                                <button className="w-6 h-6 rounded-full" style={{backgroundColor: color}} onClick={() => selectColor(color)}></button>
                            </div>
                        ))
                    }
                </div>
            </div>
            )
        }
        {
            typeof sizes !== 'undefined' && sizes.length !== 0 && (
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div className="flex items-center mt-2">
                        {
                            sizes.map((size, index) => (
                                <button key={index} className="text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600" style={{backgroundColor: (selectedSize == size) ? 'rgb(156 163 175)' : 'rgb(209 213 219)'}} onClick={() => selectSize(size)}>{size}</button>
                            ))
                        }
                    </div>
                </div>
            )
        }
        <div className="mb-4 mt-3 mr-4 lg:mb-0">
            <div className="w-28">
                <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <span className="m-auto text-2xl font-thin" onClick={() => setQuantity(quantity - 1)}>-</span>
                    </button>
                    <input type="number" className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" value={quantity} min="1" disabled />
                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                        <span className="m-auto text-2xl font-thin" onClick={() => setQuantity(quantity + 1)}>+</span>
                    </button>
                </div>
            </div>
        </div>           
        <div className="mt-5">
            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{desc}</p>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span className="text-3xl font-bold text-slate-900">${discountPrice ? discountPrice : price}</span>
                    { discountPrice && (<span className="text-sm text-slate-900 line-through">${price}</span>) }
                </p>
        </div>
            <div className="flex flex-col mb-4 justify-between">
                <div className="w-full px-2 m-1">
                    <button 
                        className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" 
                        disabled={isPending} 
                        onClick={() => {
                            startTransition(async () => { 
                                await addToCart(id, quantity, selectedColor, selectedSize)
                                router.push('/cart')
                            })
                        }}
                        >Add to Cart</button>
                </div>
                <div className="w-full px-2 m-1">
                    <button 
                        className="w-full bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        disabled={isPending} 
                        onClick={() => {
                            startTransition(async () => { 
                                await addToCart(id, quantity, selectedColor, selectedSize)
                                router.push('/checkout')
                            })
                        }}
                    >Buy Now</button>
                </div>
            </div>
    </div>
  )
}
