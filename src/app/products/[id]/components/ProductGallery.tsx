'use client'

import { useState } from "react"

type Props = {
    images: string[]
}

export default function ProductGallery({ images }: Props) {

    const [activeImg, setActiveImage] = useState(images[0])
    
    return (
        <div className='flex flex-col gap-6 mb-4'>
            <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
            <div className='flex flex-row justify-between h-24'>
                {
                    images.map((image, index) => (
                        <img key={index} src={image} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(image)} />
                    ))
                }  
                
            </div>
        </div>
    )
}
