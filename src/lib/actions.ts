"use server"

import { redirect } from "next/navigation"

export async function searchProducts(formData: FormData) {
    const query = formData.get("query")?.toString()

    if(query)
        redirect(`/search?query=${query}`)
}