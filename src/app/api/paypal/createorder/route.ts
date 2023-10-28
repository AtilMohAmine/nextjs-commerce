'use server'

import client from '@/lib/paypal/client'
import paypal from '@paypal/checkout-server-sdk'
import { getCart } from "@/lib/db/cart"
import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'


export async function POST(
    req: Request
    ) {

    if(req.method != "POST")
      return NextResponse.json({success: false, message: "Not Found"}, {
        status: 400,
      })

    const { 
        email,
        firstName,
        lastName,
        address,
        city,
        country,
        province,
        postalCode,
        phone
    } = await req.json()
    
      const cart = await getCart()
      if(!cart)
        return
  
      const shippingPrice = 10
      const total = cart?.subtotal + shippingPrice
  
      try{
          const PaypalClient = client()
  
          const request = new paypal.orders.OrdersCreateRequest()
          request.headers['Prefer'] = 'return=representation'
          request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: total+"",
                },
              },
            ],
          })

          const response = await PaypalClient.execute(request)
          if (response.statusCode !== 201) {
              console.log("Error "+response)
              return NextResponse.json({success: false, message: "Error"}, {
                status: 500,
              })
          }
                
          await prisma.order.upsert({
            where: {
              cartId: cart.id,
            },
            create: {
              orderId: response.result.id,
              email: email,
              firstName: firstName,
              lastName: lastName,
              address: address,
              city: city,
              country: country,
              province: province,
              postalCode: postalCode,
              phone: phone,
              cartId: cart.id,
              status: 'pending',
            },
            update: {
              orderId: response.result.id,
              email: email,
              firstName: firstName,
              lastName: lastName,
              address: address,
              city: city,
              country: country,
              province: province,
              postalCode: postalCode,
              phone: phone,
            }
          });
      
          return NextResponse.json({success: true, orderId: response.result.id}, {
            status: 200,
          })
        } 
        catch(err){
          console.log("Err at Create Order: ", err)
          return NextResponse.json({success: false, message: "Error"}, {
            status: 500,
          })
        }
}
