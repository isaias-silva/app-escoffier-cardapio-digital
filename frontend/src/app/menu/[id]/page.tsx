"use client"
import React, { useEffect, useState } from 'react'

import { getMenu } from '../../../app/api/services/menu.service';
import { MenuResponse } from '../../../interfaces/menu.interface';
import { useParams, useRouter } from 'next/navigation';
import { getMyRestaurant } from '../../api/services/restaurant.service';
import MenuControl from '../../components/menu.control';
import LoadComponent from '../../components/load.component';
import DisheForm from '../../components/dishe.form';
import Link from 'next/link';


export default function page() {

  const route = useRouter()
  const params = useParams()
  const [isMe, setIsme] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(true)
  const [openCreationDishe, setOpenCreationDishe] = useState<boolean>(false)
  useEffect(() => {
    if (params?.id) {
      refreshMenu(params.id.toString())

    }
  }, [route, params])

  const refreshMenu = (id: string) => getMenu(id, 1, 6).then(res => {
    console.log(res)
    getMyRestaurant().then(response => {
      if (response?.data.id == res.restaurantId) {
        setLoad(false)
        setIsme(true)
      } else {
        setLoad(false)
        setIsme(false)
      }
    }).catch(() => {
      setLoad(false)
      setIsme(false)
    })
    setMenu(res)

  }).catch(() => route.replace('/error'))

  const [menu, setMenu] = useState<MenuResponse>()


  return (
    <div className="bg-orange-100 min-h-screen py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 w-full text-white bg-orange-500 absolute top-0 rounded-b-2xl">{menu?.name}</h1>

      {load && <LoadComponent />}
      {isMe && menu && <DisheForm menuId={menu.id}
        create={true}
        open={openCreationDishe}
        callback={() => location.reload()}
        setOpen={setOpenCreationDishe} />}
      <MenuControl isMe={isMe} menu={menu} />
      <div className="max-w-4xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu?.dishes && menu.dishes.map((item, index) => (
            <Link href={"dishes/" + item.id} key={index} className="bg-white transition-all duration-300 hover:scale-105 rounded-lg shadow-md overflow-hidden">
              <img src={item.image || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt={item.name} className="w-full h-40 object-cover object-center" />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4 w-full px-2">{item.description?.substring(0, 40)}...</p>
                <p className="text-orange-500 font-semibold">{item.price?.toFixed(2)} R$</p>
              </div>
            </Link>
          ))}
          {/** load abaixo */}

          <div className="p-6">

            {isMe && <button onClick={() => setOpenCreationDishe(true)} className='bg-white rounded-lg shadow-md p-4 w-[200px] transition-all duration-300 hover:scale-110' >
              <h2 className='text-2xl'>+</h2>
            </button>}
          </div>

        </div>
      </div>
    </div>
  );
}
