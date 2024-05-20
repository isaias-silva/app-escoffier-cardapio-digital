import Link from "next/link";
import { Dishe } from "../../core/interfaces/dishe.interface";
import MoonIcon from '@mui/icons-material/Bedtime';
import SunIcon from '@mui/icons-material/Brightness7';
import { useContext } from "react";
import { PalleteContext } from "../../context/pallete.context";
export default function DisheCard ({ dishe }: { dishe: Dishe }) {

    const {pallete}=useContext(PalleteContext)
    return <Link href={"/dishe/" + dishe.id} className=" relative bg-white transition-all duration-300 hover:scale-105 rounded-lg shadow-md overflow-hidden">

        <img src={dishe.image || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt={dishe.name} className="w-full h-40 object-cover object-center" />
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">{dishe.name}</h2>
            <p className="text-gray-600 mb-4 w-full px-2">{dishe.description?.substring(0, 40)}...</p>
            <p style={{color:pallete?.primary || "#f97316"}} className={` font-semibold`}>{dishe.price?.toFixed(2)} R$</p>
        </div>
        <div style={{background:pallete?.primary || "#f97316"}} className={` absolute bottom-0 right-0 m-2 p-2 rounded-xl font-bold text-white border-2 border-white`}>{dishe.mode == 'mornning' ? <SunIcon/> : <MoonIcon/>}</div>
    </Link>
}