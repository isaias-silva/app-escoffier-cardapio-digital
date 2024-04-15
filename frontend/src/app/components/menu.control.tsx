import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation';
import EditMenuForm from './edit.menu.form';
import { MenuResponse } from '../../interfaces/menu.interface';
import DeleteForm from './delete.form';
import { deleteRestaurantMenu } from '../api/services/menu.service';
export default function MenuControl({ isMe, menu }: { menu?: MenuResponse, isMe: boolean }) {
  const router = useRouter()
  const [openEditMenu, setEditMenu] = useState<boolean>(false)
  const [openDelete, setDelete] = useState<boolean>(false)
  
  return (<>
    <EditMenuForm
      open={openEditMenu}
      setOpen={setEditMenu}
      menu={menu}
      callback={() => location.reload()}
    />
    <DeleteForm
      open={openDelete}
      setOpen={setDelete}
      message={`apagar o cardápio ${menu?.name}?`}
      callback={() => {
        if (menu?.id)
          deleteRestaurantMenu(menu.id).then(()=>router.back())
      }}
    />
    <div className="fixed left-0 sm:bottom-0 bg-gray-50 rounded-xl overflow-hidden border-orange-500 border-2 z-10">
      {isMe && <><button onClick={() => setEditMenu(true)} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1 mb-2">
        <EditIcon className="w-4 h-4 mr-2" /> editar
      </button>

        <button onClick={() => setDelete(true)} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1 mb-2">
          <DeleteIcon className="w-4 h-4 mr-2" /> excluir
        </button></>}
      <button onClick={() => router.replace(isMe?`/dashboard`:`/dashboard?restaurant=${menu?.restaurantId}`)} className="w-full flex items-center text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg px-3 py-1">
        <ReturnIcon className="w-4 h-4 mr-2" /> retornar
      </button>
    </div>

  </>
  )
}
