import { searchProducts } from "@/lib/actions";
import { AiOutlineSearch } from "react-icons/ai";

export default function Hero() {
  return (
    <div className="w-11/12 xl:w-4/5 h-[350px] m-auto bg-stone-200 rounded-xl">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-11/12 xl:w-1/2 p-5 space-y-5">
          <h1 className="text-5xl font-semibold">Discover the ideal present for every person on your gift list.</h1>
          <form action={searchProducts}>
            <div className="bg-white flex items-center space-x-2 px-5 py-2 rounded-full">
                <AiOutlineSearch size={"1.2rem"}/>
                <input className="outline-0 w-full" name="query" type="text" placeholder="Search..." />
            </div>
          </form>
        </div>
        <div className="hidden md:flex p-5">
          <img className="w-[400px] h-[300px] border-8 border-gray-500" src="hero.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
