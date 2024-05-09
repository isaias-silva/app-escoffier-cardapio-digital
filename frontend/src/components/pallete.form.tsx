import { useState } from "react"
import ColorInput from "./inputs/color.picker.input"
import { updatePallete } from "../app/api/services/restaurant.service"
import { toast } from "react-toastify"

export function PalleteForm() {
    const [main, setMain] = useState<string>('#000')
    const [primary, setPrimary] = useState<string>('#000')
    const [secondary, setSecondary] = useState<string>('#000')
    const [font, setFont] = useState<string>('#000')
    const [hover, setHover] = useState<string>('#000')

    const updatePalleteCallback = async () => {
        try {

            const res = await updatePallete({ main, primary, secondary, font, hover })
            toast.success(res?.data.message)

        } catch (err: any) {
            toast.error(`Erro ao atualizar: ${err.response.data.message}`)

        }
    }
    return <div>
        <div className=" flex flex-wrap my-4">

            <ColorInput name="Main" state={[main, setMain]} />
            <ColorInput name="Primary" state={[primary, setPrimary]} />
            <ColorInput name="Secondary" state={[secondary, setSecondary]} />
            <ColorInput name="Font" state={[font, setFont]} />
            <ColorInput name="Hover" state={[hover, setHover]} />


        </div>
        <button onClick={() => updatePalleteCallback()} className="bg-orange-500 text-white font-bold p-2 rounded-lg my-2 transition-all duration-300 hover:bg-orange-300">Confirmar</button>
    </div>

}