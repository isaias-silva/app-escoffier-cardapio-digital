import React, { useEffect, useRef, useState } from 'react'
import { Dishe } from '../core/interfaces/dishe.interface'
import { getMenu, getMenuInRealTime } from '../app/api/services/menu.service'
import DisheCard from './dishe.card'

export default function Load({ menuId, isRealTime }: { menuId: string, isRealTime: boolean }) {
    const [visible, setVisible] = useState<boolean>(false)
    const [limit, setLimit] = useState<boolean>(false)
    const [dishes, setDishes] = useState<Dishe[]>([])
    const [page, setPage] = useState<number>(2)

    const divRef = useRef(null)
    const callback = (entries: any) => {
        const [entry] = entries
        setVisible(entry.isIntersecting)

    }
    const option = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }
    useEffect(() => {

        const observer = new IntersectionObserver(callback, option)
        if (divRef.current) { observer.observe(divRef.current) }
    }, [divRef])

    useEffect(() => {
        if (!visible) {
            return
        }
        (isRealTime?getMenuInRealTime(menuId, page, 6):getMenu(menuId, page, 6)).then((res) => {
            setPage(page + 1)
            if (res.dishes && res.dishes.length > 0) {
                if (res.dishes.length < 6) {
                    setLimit(true)
                }
                res.dishes.forEach((v) => dishes.push(v))
            } else {
                setLimit(true)
            }
        })

    }, [visible])
    return (
        <>
            {dishes.map((dishe, i) => {
                return <DisheCard key={i} dishe={dishe} />
            })}
            {!limit && <div ref={divRef} className="w-full h-[100px] rounded">

            </div>}
        </>

    )
}
