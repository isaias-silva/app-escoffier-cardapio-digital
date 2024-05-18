"use client"
import { createContext, useEffect, useState } from "react";
import { Restaurant } from "../core/interfaces/restaurant.interface";
import { getPallete } from "../app/api/services/restaurant.service";



export const PalleteContext = createContext<
    {
        pallete?: Restaurant["pallete"],
        refreshPallete?: () => void,
        changePalleteInRealTime?: (pallete: Restaurant['pallete']) => void
    }>({});

export function PalleteProvider({ children }: { children: React.ReactNode }) {
    const [pallete, setPallete] = useState<Restaurant["pallete"]>()
    useEffect(() => {
     refreshPallete()
    }, [])

    const changePalleteInRealTime = (pallete: Restaurant['pallete']) => {
        setPallete(pallete)
    }
    const refreshPallete=()=>{
        const newPallete = getPallete()
        console.log(newPallete)
        setPallete(newPallete)
    }
    return (
        <PalleteContext.Provider value={{ pallete, changePalleteInRealTime,refreshPallete }}>
            {children}
        </PalleteContext.Provider>)
}