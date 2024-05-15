import { useContext, useEffect, useState } from "react"
import ColorInput from "./inputs/color.picker.input"
import { updatePallete } from "../app/api/services/restaurant.service"
import { toast } from "react-toastify"
import { Restaurant } from "../core/interfaces/restaurant.interface"
import { PalleteContext } from "../context/pallete.context"

export function PalleteForm() {
   
    const { pallete } = useContext(PalleteContext)
    
    const [main, setMain] = useState<string>('#000')
    const [primary, setPrimary] = useState<string>('#000')
    const [secondary, setSecondary] = useState<string>('#000')
    const [font, setFont] = useState<string>('#000')


    useEffect(()=>{
        if(pallete){

            setMain(pallete.main)
            setPrimary(pallete.primary)
            setSecondary(pallete.secondary)
            setFont(pallete.font)
         
        }

    },[pallete])
    const updatePalleteCallback = async () => {
        try {

            const res = await updatePallete({ main, primary, secondary, font})
            toast.success(res?.data.message)

        } catch (err: any) {
            toast.error(`Erro ao atualizar: ${err.response.data.message}`)

        }
    }
    return <div>
        <div className=" flex overflow-hidden rounded-xl bg-red-50 w-[290px]">

            <ColorInput name="Main" state={[main, setMain]} />
            <ColorInput name="Primary" state={[primary, setPrimary]} />
            <ColorInput name="Secondary" state={[secondary, setSecondary]} />
            <ColorInput name="Font" state={[font, setFont]} />
          


        </div>
        <button style={{background:pallete?.secondary || "#f97316"}} onClick={() => updatePalleteCallback()} className="bg-orange-500 text-white font-bold p-2 rounded-lg my-2 transition-all duration-300 hover:scale-110">Confirmar</button>
    </div>

}