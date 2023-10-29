import { getCart } from "@/lib/db/cart";
import CheckoutForm from "./components/CheckoutForm";
import { redirect } from "next/navigation";

export default async function Page() {

    const cart = await getCart()

    if ((cart?.size || 0) == 0)
        redirect('/')

    const subTotal = cart?.subtotal
    const shipping = 10

    const paypalClientId = process.env.PAYPAL_CLIENT_ID
    
  return (
    <div className="md:flex items-start px-4 py-6 sm:px-6">
        <CheckoutForm paypalClientId={paypalClientId} subTotal={subTotal} shipping={shipping} />
    </div>

  )
}
