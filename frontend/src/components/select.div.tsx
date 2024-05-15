import React, { useContext, useState } from "react";
import { PalleteContext } from "../context/pallete.context";


export function SelectDiv({ children, titles }: { titles: string[], children: React.ReactNode[] }) {

    const [activeDiv, setActiveDiv] = useState<number>(0)

    const {pallete}=useContext(PalleteContext)

    const childrens = React.Children.map(children, (child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, {
            className: `transition-all duration-300 ${index === activeDiv ? 'block' : 'hidden'}`
        })

    })
    return <div className=" w-full ">
        <div className=" flex w-full justify-around my-2">
            {titles.map((v, i) => <button onClick={() => setActiveDiv(i)} style={{color: pallete?.secondary|| "#000"}}  className={` font-bold hover:underline ${i == activeDiv ? 'underline' : ''}`} key={i}>{v}</button>)}
        </div>
        {childrens}
    </div>



}