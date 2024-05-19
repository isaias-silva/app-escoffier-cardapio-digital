import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { getAllRestaurantMenus } from '../../app/api/services/menu.service'
import {  MenuResponse } from '../../core/interfaces/menu.interface'
import CreateMenuForm from '../forms/create.menu.form'
import { AuthContext } from '../../context/auth.context'

export default function MenusList() {
    const [menus, setMenus] = useState<MenuResponse[]>([])
    const [open, setOpen] = React.useState(false);
    const {restaurant,isMe}=useContext(AuthContext)
   
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        refreshMenus();
        
    }, [restaurant]);

    const refreshMenus = () => getAllRestaurantMenus(1, 99, restaurant?.id).then((res) => setMenus(res))
    return (

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <CreateMenuForm open={open}
                handleOpen={handleOpen}
                setOpen={setOpen}
                callback={refreshMenus} />

            {menus.map((menuData,i) =>
                <Link key={i} href={`menu/${menuData.id}${!isMe?'?filter=realtime':''}`} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-105">
                    <div className="text-gray-800 font-semibold">{menuData.name}</div>
                </Link>


            )}{
                isMe ?
                    <button className='bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-105' >
                        <h2 className='text-2xl' onClick={handleOpen}>+</h2>
                    </button> : null}
        </div>
    )
}
