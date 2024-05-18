"use client"
import { createContext, useEffect, useState } from "react";
import { Restaurant } from "../core/interfaces/restaurant.interface";
import { getPallete } from "../app/api/services/restaurant.service";



export const PalleteContext = createContext<
    {
        pallete?: Restaurant["pallete"],
        mirrorPallete?: Restaurant["pallete"],
        refreshPallete?: () => void,
        changePalleteInRealTime?: (pallete: Restaurant['pallete']) => void
    }>({});

export function PalleteProvider({ children }: { children: React.ReactNode }) {
    const [pallete, setPallete] = useState<Restaurant["pallete"]>()
    const [mirrorPallete, setMirrorPallete] = useState<Restaurant["pallete"]>()

    useEffect(() => {
        refreshPallete()
        setMirrorPallete(pallete)
    }, [])

    const changePalleteInRealTime = (pallete: Restaurant['pallete']) => {
        setMirrorPallete(pallete)
    }
    const refreshPallete = () => {
        const newPallete = getPallete()

        setPallete(newPallete)
    }
    return (
        <PalleteContext.Provider value={{ pallete, mirrorPallete, changePalleteInRealTime, refreshPallete }}>
            {children}
        </PalleteContext.Provider>)
}