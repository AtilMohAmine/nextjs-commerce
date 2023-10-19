type Product = {
    id: string,
    name: string,
    desc: string,
    images: string[],
    price: number,
    discountPrice?: number,
    discountRate?: number,
    type: string,
    colors?: string[],
    sizes?: string[],
}
