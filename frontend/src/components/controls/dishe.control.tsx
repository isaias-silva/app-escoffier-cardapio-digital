"use client"
import React, { useContext, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation';
import { Dishe } from '../../core/interfaces/dishe.interface';
import { getMyRestaurant } from '../../app/api/services/restaurant.service';
import DeleteForm from '../forms/delete.form';
import DisheForm from '../forms/dishe.form';
import { deleteDishe } from '../../app/api/services/dishe.service';
import { PalleteContext } from '../../context/pallete.context';

export default function DisheControl({ dishe }: { dishe: Dishe }) {
    const router = useRouter()
    const [isMe, setIsme] = useState<boolean>()
    const [editDishe, setEditDishe] = useState<boolean>(false)
    const [deleteDisheModal, setDeleteDisheModal] = useState<boolean>(false)
    const { pallete } = useContext(PalleteContext)
    const deleteDisheCallback = () => {
        deleteDishe({ many: false, id: dishe.id }).then((res) => router.back())
    }

    useEffect(() => {
        getMyRestaurant().then((res) => setIsme(res?.data.id == dishe.restaurantId)).catch(err => setIsme(false))
    }, [dishe])

    return (
        <>
            <div style={{ borderColor: pallete?.primary || "#f97316", background: pallete?.main || "#fff"}}
                className="fixed left-0 sm:bottom-0 rounded-xl overflow-hidden  border-2 z-10">
                {isMe && dishe.menuId && <>
                    <DisheForm create={false}
                        menuId={dishe?.menuId}
                        open={editDishe}
                        setOpen={setEditDishe}
                        disheUpdate={dishe}
                        callback={() => location.reload()}

                    />
                    <DeleteForm
                        message={`deseja mesmo deletar o prato ${dishe.name} ?`}
                        setOpen={setDeleteDisheModal}
                        callback={deleteDisheCallback}
                        open={deleteDisheModal} />

                    <button style={{ color: pallete?.primary || "#f97316" }} onClick={() => setEditDishe(true)} className={`w-full flex items-center rounded-lg px-3 py-1 mb-2 hover:underline`}>
                        <EditIcon className="w-4 h-4 mr-2" /> editar
                    </button>
                    <button style={{ color: pallete?.primary || "#f97316" }} onClick={() => setDeleteDisheModal(true)} className={`w-full flex items-center rounded-lg px-3 py-1 mb-2 hover:underline`}>
                        <DeleteIcon className="w-4 h-4 mr-2" /> excluir
                    </button></>}
                <button style={{ color: pallete?.primary || "#f97316" }} onClick={() => router.back()} className="w-full flex items-center rounded-lg px-3 py-1 hover:underline">
                    <ReturnIcon className="w-4 h-4 mr-2" /> retornar
                </button>
            </div>
        </>
    )
}
