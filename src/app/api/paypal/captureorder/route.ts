'use server'

import client from '@/lib/paypal/client'
import paypal from '@paypal/checkout-server-sdk'
import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request
) {

  if(req.method != "POST")
      return NextResponse.json({success: false, message: "Not Found"}, {
        status: 404,
      })

  const { orderId } = await req.json()
  const PaypalClient = client()
  const request = new paypal.orders.OrdersCaptureRequest(orderId)
  request.requestBody({})
  const response = await PaypalClient.execute(request)
  if (!response) {
    return NextResponse.json({success: false, message: "Error"}, {
      status: 500,
    })
  }

  await prisma.order.updateMany({
    where: {
      orderId,
    },
    data: {
      status: 'paid',
    },
  })

  return NextResponse.json({success: true, ...response.result}, {
    status: 200,
  })
}