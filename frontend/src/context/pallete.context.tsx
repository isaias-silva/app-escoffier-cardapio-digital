"use client"
import { createContext, useEffect, useState } from "react";
import { Restaurant } from "../core/interfaces/restaurant.interface";
import { getPallete } from "../app/api/services/restaurant.service";



export const PalleteContext = createContext<Restaurant["pallete"] | undefined>(undefined);

export function PalleteProvider({ children }: { children: React.ReactNode }) {
    const [pallete, setPallete] = useState<Restaurant["pallete"]>()
    useEffect(() => {
        const newPallete = getPallete()

        setPallete(newPallete)
    }, [])
    return(
    <PalleteContext.Provider value={pallete}>
        {children}
    </PalleteContext.Provider>)
}