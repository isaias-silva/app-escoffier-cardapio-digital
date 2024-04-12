"use client"
import React, { useEffect, useState } from 'react'
import { Dishe } from '../../../interfaces/dishe.interface';
import { getMenu } from '../../../app/api/services/menu.service';
import { MenuResponse } from '../../../interfaces/menu.interface';
import { useParams, useRouter } from 'next/navigation';
import { getMyRestaurant } from '../../api/services/restaurant.service';


export default function page() {

  const route = useRouter()
  const params = useParams()
  const [isMe, setIsme] = useState<boolean>(false)
  useEffect(() => {
    if (params?.id) {
      refreshMenu(params.id.toString())

    }
  }, [route])
  const refreshMenu = (id: string) => getMenu(id, 1, 100).then(res => {
    getMyRestaurant().then(response => { if (response?.data.id == res.restaurantId) { setIsme(true) } }).catch(() => { setIsme(false) })
    setMenu(res)

  }).catch(() => route.replace('/error'))

  const [menu, setMenu] = useState<MenuResponse>()


  return (
    <div className="bg-orange-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">{menu?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu?.dishes && menu.dishes.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover object-center" />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-orange-500 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}


          <div className="p-6">

            {isMe && <button className='bg-white rounded-lg shadow-md p-4 w-[200px] transition-all duration-300 hover:scale-110' >
              <h2 className='text-2xl'>+</h2>
            </button>}
          </div>

        </div>
      </div>
    </div>
  );
}
