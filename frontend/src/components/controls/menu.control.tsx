import React, { useContext, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/navigation';
import EditMenuForm from '../forms/edit.menu.form';
import { MenuResponse } from '../../core/interfaces/menu.interface';
import DeleteForm from '../forms/delete.form';
import { deleteRestaurantMenu } from '../../app/api/services/menu.service';
import { AuthContext } from '../../context/auth.context';
import { PalleteContext } from '../../context/pallete.context';
export default function MenuControl({ menu, isMe }: { isMe?: boolean, menu?: MenuResponse }) {
  const router = useRouter()
  const [openEditMenu, setEditMenu] = useState<boolean>(false)
  const [openDelete, setDelete] = useState<boolean>(false)

  const { pallete } = useContext(PalleteContext)
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
          deleteRestaurantMenu(menu.id).then(() => router.back())
      }}
    />
    <div style={{background:pallete?.main || "#fff", borderColor: pallete?.primary || "#f97316" }}
      className="fixed left-0 sm:bottom-0 rounded-xl overflow-hidden  border-2 z-10">
      {isMe && <><button style={{ color: pallete?.primary || "#f97316" }}
        onClick={() => setEditMenu(true)} className="w-full flex items-centerrounded-lg px-3 py-1 mb-2 hover:underline">
        <EditIcon className="w-4 h-4 mr-2" /> editar
      </button>
        <button style={{ color: pallete?.primary || "#f97316" }} onClick={() => setDelete(true)}
          className="w-full flex items-center rounded-lg px-3 py-1 mb-2 hover:underline">
          <DeleteIcon className="w-4 h-4 mr-2" /> excluir
        </button></>}

      <button style={{ color: pallete?.primary || "#f97316" }}
        onClick={() => router.replace(isMe ? `/dashboard` : `/dashboard?restaurant=${menu?.restaurantId}`)}
        className="w-full flex items-centerrounded-lg px-3 py-1 hover:underline">
        <ReturnIcon className="w-4 h-4 mr-2" /> retornar
      </button>
    </div>

  </>
  )
}
