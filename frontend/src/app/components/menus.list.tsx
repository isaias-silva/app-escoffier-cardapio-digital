import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllRestaurantMenus } from '../api/services/menu.service'
import { MenuData, MenuResponse } from '../../interfaces/menu.interface'
import { Box, Modal, Typography } from '@mui/material'
import CreateMenuForm from './create.menu.form'

export default function MenusList({ id, isMe }: { id?: string, isMe: boolean }) {
    const [menus, setMenus] = useState<MenuResponse[]>([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        refreshMenus();
        
    }, [id]);

    const refreshMenus = () => getAllRestaurantMenus(1, 99, id).then((res) => setMenus(res))
    return (

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <CreateMenuForm open={open}
                handleOpen={handleOpen}
                setOpen={setOpen}
                callback={refreshMenus} />

            {menus.map((menuData) =>
                <Link href={`menu/${menuData.id}`} className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-110">
                    <div className="text-gray-800 font-semibold">{menuData.name}</div>
                </Link>


            )}{
                isMe ?
                    <button className='bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-110' >
                        <h2 className='text-2xl' onClick={handleOpen}>+</h2>
                    </button> : null}
        </div>
    )
}
