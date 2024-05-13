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
        <div className="flex h-full items-center w-full">

            <input
                onChange={(ev) => setColor(ev.target.value)}
                type="color"
                id={id}
                name="colorPicker"
                className=" w-[1px] opacity-0"
                value={color}
            />
            <label ref={refColor} htmlFor={id} className={` m-h-10 m-w-10 p-2 cursor-pointer text-white`} >{name}</label>
        </div>
    );
};

export default ColorInput;