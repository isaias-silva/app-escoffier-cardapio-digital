"use client"
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation';
import { Dishe } from '../core/interfaces/dishe.interface';
import { getMyRestaurant } from '../app/api/services/restaurant.service';
import DeleteForm from './delete.form';
import DisheForm from './dishe.form';
import { deleteDishe } from '../app/api/services/dishe.service';

export default function DisheControl({ dishe }: { dishe: Dishe }) {
    const router = useRouter()
    const [isMe, setIsme] = useState<boolean>()
    const [editDishe, setEditDishe] = useState<boolean>(false)
    const [deleteDisheModal, setDeleteDisheModal] = useState<boolean>(false)
    const deleteDisheCallback = () => {
        deleteDishe({ many: false, id: dishe.id }).then((res)=>router.back())
    }

    useEffect(() => {
        getMyRestaurant().then((res) => setIsme(res?.data.id == dishe.restaurantId)).catch(err => setIsme(false))
    }, [dishe])

    return (
        <>
            <div className="fixed left-0 sm:bottom-0 bg-gray-50 rounded-xl overflow-hidden border-orange-500 border-2 z-10">
                {isMe && dishe.menuId && <>
                    <DisheForm create={false}
                        menuId={dishe?.menuId}
                        open={editDishe}
                        setOpen={setEditDishe}
                        disheUpdate={dishe}
                        callback={()=>location.reload()}
                      
                    />
                    <DeleteForm
                        message={`deseja mesmo deletar o prato ${dishe.name} ?`}
                        setOpen={setDeleteDisheModal}
                        callback={deleteDisheCallback}
                        open={deleteDisheModal} />

                    <button onClick={() => setEditDishe(true)} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1 mb-2">
                        <EditIcon className="w-4 h-4 mr-2" /> editar
                    </button>
                    <button onClick={() => setDeleteDisheModal(true)} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1 mb-2">
                        <DeleteIcon className="w-4 h-4 mr-2" /> excluir
                    </button></>}
                <button onClick={() => router.back()} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1">
                    <ReturnIcon className="w-4 h-4 mr-2" /> retornar
                </button>
            </div>
        </>
    )
}
