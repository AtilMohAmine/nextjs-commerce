'use server'

import client from '@/lib/paypal/client'
import paypal from '@paypal/checkout-server-sdk'
import { getCart } from "@/lib/db/cart"
import { prisma } from '@/lib/db/prisma'

export async function checkout(
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    country: string,
    province: string,
    postalCode: string,
    phone: string
  ) {
    const cart = await getCart()
    if(!cart)
        return false

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
            return false
        }
    
        
        await prisma.Order.create({
            data: {
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
                status: 'pending'          
            }
        })
    
    
        return true
      } 
      catch(err){
        console.log("Err at Create Order: ", err)
        return false
      }

}