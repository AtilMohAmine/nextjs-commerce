'use client'

import React, { useRef } from 'react'
import Bill from './Bill'
import {
    PayPalScriptProvider,
    PayPalButtons,
    FUNDING,
  } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    subTotal: number,
    shipping: number
}


export default function POST({ subTotal, shipping }: Props) {

    const emailInput = useRef()
    const firstNameInput = useRef()
    const lastNameInput = useRef()
    const addressInput = useRef()
    const cityInput = useRef()
    const countryInput = useRef()
    const provinceInput = useRef()
    const postalCodeInput = useRef()
    const phoneInput = useRef()
    const router = useRouter()

    const paypalCreateOrder = async () => {
        
        try {
          let response = await axios.post('/api/paypal/createorder', {
            email: emailInput.current.value,
            firstName: firstNameInput.current.value,
            lastName: lastNameInput.current.value,
            address: addressInput.current.value,
            city: cityInput.current.value,
            country: countryInput.current.value,
            province: provinceInput.current.value,
            postalCode: postalCodeInput.current.value,
            phone: phoneInput.current.value
          })
          return response.data.orderId
        } catch (err) {
          return null
        }
      }

    const paypalCaptureOrder = async orderId => {
        try {
          let response = await axios.post('/api/paypal/captureorder', {
            orderId
          })
          if (response.data.success) {
            router.push('/')
          }
        
        } catch (err) {
            return null
        }
      }
    
  return (
    <>
        <div className="md:w-7/12 lg:pr-10 mb-10">
            <h2 className="text-3xl font-medium text-gray-900" id="slide-over-title">Checkout</h2>
            <div className="mt-10">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Email address</label>
                <div>
                    <input ref={emailInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                </div>
            </div>
            <div className="mt-3">
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">First name</label>
                        <div>
                            <input ref={firstNameInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Last name</label>
                        <div>
                            <input ref={lastNameInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Address</label>
                <div>
                    <input ref={addressInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                </div>
            </div>
            <div className="mt-3">
                <div className="grid gap-y-3 gap-x-4 grid-cols-2">
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">City</label>
                        <div>
                            <input ref={cityInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Country</label>
                        <div>
                            <select ref={countryInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                                <option value="usa">United States</option>
                                <option value="canada">Canada</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">State / Province</label>
                        <div>
                            <input ref={provinceInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Postal code</label>
                        <div>
                            <input ref={postalCodeInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Phone</label>
                <div>
                    <input ref={phoneInput} className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="tel" />
                </div>
            </div>
        </div>
        <div className="px-3 md:w-5/12">
            <Bill subTotal={subTotal} shipping={shipping} />
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                    <div className="mb-5">
                            <img src="/cards.png" className="h-6 ml-1" />
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
                        <button 
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                                onClick={() => {
                                    startTransition(async () => { 
                                        await checkout(
                                            emailInput.current.value,
                                            firstNameInput.current.value,
                                            lastNameInput.current.value,
                                            addressInput.current.value,
                                            cityInput.current.value,
                                            countryInput.current.value,
                                            provinceInput.current.value,
                                            postalCodeInput.current.value,
                                            phoneInput.current.value
                                        )
                                    })
                                }}>
                            Pay Now
                        </button>
                    </div>
                </div>
                <div className="w-full p-3">
                <PayPalScriptProvider
                    options={{
                        clientId: 'AUujoh1ioCKrbB0CoRBn7_gfYBJKvKsJiwdGirVHZQ-KtOuNDbRHREAWP-5LS7EUWLiUlPDjTaBMwpnt'
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'blue',
                            shape: 'rect',
                            label: 'pay',
                            height: 50,
                        }}
                        fundingSource={FUNDING.PAYPAL}
                        createOrder={async (data, actions) => {
                            let order_id = await paypalCreateOrder()
                            return order_id + ''
                          }}
                        onApprove={async (data, actions) => {
                            let response = await paypalCaptureOrder(data.orderID)
                            if (response) return true
                        }}
                    />
                </PayPalScriptProvider>
                </div>
            </div>
            
        </div>
    </>
  )
}
function useMutation<T, U, V, W>(arg0: () => any) {
    throw new Error('Function not implemented.')
}

