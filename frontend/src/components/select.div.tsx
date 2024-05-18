import React, { useContext, useState } from "react";
import { PalleteContext } from "../context/pallete.context";
import { invertHexColor } from "../core/utils/invert.hex";


export function SelectDiv({ children, titles, mode }: { titles: string[], children: React.ReactNode[], mode: 'edit' | 'normal' }) {

    const [activeDiv, setActiveDiv] = useState<number>(0)

    const { pallete, mirrorPallete } = useContext(PalleteContext)

    const childrens = React.Children.map(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
            className: `transition-all duration-300 ${index === activeDiv ? 'block' : 'hidden'}`
        })

    })
    return <div style={{ color: invertHexColor((mode == 'edit' ? mirrorPallete?.font : pallete?.font) || "#fff") }} className=" w-full ">
        <div className=" flex w-full justify-around my-2">
            {titles.map((v, i) => <button onClick={() => setActiveDiv(i)} style={{ color: (mode == 'edit' ? mirrorPallete : pallete)?.secondary || "#000" }} className={` font-bold hover:underline ${i == activeDiv ? 'underline' : ''}`} key={i}>{v}</button>)}
        </div>
        {childrens}
    </div>



}