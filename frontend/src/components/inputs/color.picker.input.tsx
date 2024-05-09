import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { invertHexColor } from "../../core/utils/invert.hex";


const ColorInput = ({ state, name }: { name: string, state: [string | undefined, Dispatch<SetStateAction<string>>] }) => {
    const [id, setId] = useState<string>()
    const [color, setColor] = state
    useMemo(() => {
        setId(Math.random().toString(32).replace('0.', 'color-input-'))
    }, [])
    const refColor = useRef<HTMLLabelElement>(null)

    useEffect(() => {
        if (refColor.current && color){
            const itemStyle = refColor.current.style;
            itemStyle.background = color;
            itemStyle.color = invertHexColor(color);
            itemStyle.borderColor = invertHexColor(color);
       
        }
        
    }, [color])
    return (
        <div className="flex h-full items-center mr-10">

            <input
                onChange={(ev) => setColor(ev.target.value)}
                type="color"
                id={id}
                name="colorPicker"
                className=" w-[1px] opacity-0"
            />
            <label ref={refColor} htmlFor={id} className={` border-2 border-white font-bold cursor-pointer text-gray-100 flex items-center justify-center m-0 bg-gray-800 h-auto p-4 rounded-full`} >{name}</label>
        </div>
    );
};

export default ColorInput;