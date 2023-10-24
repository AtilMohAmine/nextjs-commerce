'use client'

import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Page() {

    const [ paymentMethod, setPaymentMethod ] = useState('paypal')

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.target.name === 'card'
        ? setPaymentMethod('card')
        : setPaymentMethod('paypal')
    }
    
  return (
    <div className="md:flex items-start px-4 py-6 sm:px-6">
        <div className="md:w-7/12 lg:pr-10 mb-10">
            <h2 className="text-3xl font-medium text-gray-900" id="slide-over-title">Checkout</h2>
            <div className="mt-10">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Email address</label>
                <div>
                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                </div>
            </div>
            <div className="mt-3">
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">First name</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Last name</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Address</label>
                <div>
                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                </div>
            </div>
            <div className="mt-3">
                <div className="grid gap-y-3 gap-x-4 grid-cols-2">
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">City</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Country</label>
                        <div>
                            <select className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                <option value="usa">United States</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">State / Province</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Postal code</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Phone</label>
                <div>
                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="tel" />
                </div>
            </div>
        </div>
        <div className="px-3 md:w-5/12">
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="mt-3 mb-6 pb-6 border-b border-gray-200 text-gray-800">
                    <div className="w-full flex mb-3 items-center">
                        <div className="flex-grow">
                            <span className="text-gray-600">Subtotal</span>
                        </div>
                        <div className="pl-3">
                            <span className="font-semibold">$190.91</span>
                        </div>
                    </div>
                    <div className="w-full flex items-center">
                        <div className="flex-grow">
                            <span className="text-gray-600">Shipping</span>
                        </div>
                        <div className="pl-3">
                            <span className="font-semibold">$19.09</span>
                        </div>
                    </div>
                </div>
                <div className="pb-3 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                    <div className="w-full flex items-center">
                        <div className="flex-grow">
                            <span className="text-gray-600">Total</span>
                        </div>
                        <div className="pl-3">
                            <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">$210.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                    <div className="mb-5">
                        <label htmlFor="type1" className="flex items-center cursor-pointer">
                            <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="card" id="type1" onChange={handleChange} checked={paymentMethod === 'card'} />
                            <img src="/cards.png" className="h-6 ml-3" />
                        </label>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                            <div>
                                <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                            <div>
                                <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                            </div>
                        </div>
                        <div className="mb-3 -mx-2 flex justify-center items-end">
                            <div className="px-2 w-1/3">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                                <div>
                                    <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                        <option value="01">01 - January</option>
                                        <option value="02">02 - February</option>
                                        <option value="03">03 - March</option>
                                        <option value="04">04 - April</option>
                                        <option value="05">05 - May</option>
                                        <option value="06">06 - June</option>
                                        <option value="07">07 - July</option>
                                        <option value="08">08 - August</option>
                                        <option value="09">09 - September</option>
                                        <option value="10">10 - October</option>
                                        <option value="11">11 - November</option>
                                        <option value="12">12 - December</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-2 w-1/3">
                                <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                </select>
                            </div>
                            <div className="px-2 w-1/3">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                                <div>
                                    <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-3">
                    <label htmlFor="type2" className="flex items-center cursor-pointer">
                        <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="paypal" id="type2" onChange={handleChange} checked={paymentMethod === 'paypal'} />
                        <img src="/PayPal.svg" width="80" className="ml-3" />
                    </label>
                </div>
            </div>
            <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full">Pay Now</button>
        </div>
    </div>

  )
}
