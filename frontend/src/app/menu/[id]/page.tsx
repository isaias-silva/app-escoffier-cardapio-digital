"use client"
import React, { useEffect, useState } from 'react'

import { getMenu, getMenuInRealTime } from '../../../app/api/services/menu.service';
import { MenuResponse } from '../../../interfaces/menu.interface';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getMyRestaurant } from '../../api/services/restaurant.service';
import MenuControl from '../../components/menu.control';
import LoadComponent from '../../components/load.component';
import DisheForm from '../../components/dishe.form';
import Link from 'next/link';
import DisheCard from '../../components/dishe.card';
import Load from '../../components/load';
import { getCategories } from '../../api/services/category.service';


export default function Page() {

  const route = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [menu, setMenu] = useState<MenuResponse>()
  const [isMe, setIsme] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(true)
  const [realTime, setRealTime] = useState<boolean>(false)
  const [categories, setCategories] = useState<{ id: string, name: string }[]>()
  const [openCreationDishe, setOpenCreationDishe] = useState<boolean>(false)

  useEffect(() => {
    if (searchParams?.get('filter') == 'realtime') {
      setRealTime(true)
    }

    if (params?.id) {
      refreshMenu(params.id.toString())
    }
  }, [route, params, searchParams])


  useEffect(() => {
    if (!menu) {

      return
    }
    getCategories(menu.restaurantId).then(res=>setCategories(res))
    getMyRestaurant().then(res => setIsme(res?.data.id == menu.restaurantId)).catch(() => setIsme(false))
  }, [route, menu])

  const getBgRealTime = () => {
    if (realTime) {
      const date = new Date()
      if (date.getHours() > 17 || date.getHours() < 4) {
        return 'bg-gray-700'
      } else {
        return 'bg-orange-100'
      }
    } else {
      return 'bg-orange-100'
    }


  }




  const getBgDivRealTime = () => {
    if (realTime) {
      const date = new Date()
      if (date.getHours() > 17 || date.getHours() < 4) {
        return 'bg-blue-950'
      } else {
        return 'bg-orange-500'
      }
    } else {
      return 'bg-orange-500'
    }


  }
  const refreshMenu = (id: string) => (searchParams?.get('filter') == 'realtime' ? getMenuInRealTime(id, 1, 6) : getMenu(id, 1, 6, searchParams?.get('category'))).then(res => {
    setLoad(false)
    setMenu(res)

  }).catch(() => route.replace('/error'))





  return (
    <div className={`${getBgRealTime()} min-h-screen py-8`}>
      <h1 className={`text-3xl shadow-lg py-2 font-semibold text-center mb-8 w-full text-white ${getBgDivRealTime()} absolute top-0 rounded-b-2xl`}>{menu?.name}</h1>
     <div className='mt-10 flex justify-center'>

     <Link className={`mx-2 p-2 ${getBgDivRealTime()} rounded-lg font-bold text-white transition-all duration-300 hover:bg-green-700`} href={`/menu/${menu?.id}`} >
            Todos
        </Link>
      {categories?.map((category,i)=>{
        return <Link className={`mx-2 p-2 ${getBgDivRealTime()} rounded-lg font-bold text-white transition-all duration-300 hover:bg-green-700`} href={`/menu/${menu?.id}?category=${category.id}`} key={i}>
              {category.name}
        </Link>
      })}
 <Link className={`mx-2 p-2 ${getBgDivRealTime()} rounded-lg font-bold text-white transition-all duration-300 hover:bg-green-700`} href={`/menu/${menu?.id}?filter=realtime`} >
            disponíveis agora
        </Link>
 </div>
    
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
            <DisheCard dishe={item} key={index} />))}

          {menu && <Load menuId={menu.id} isRealTime={realTime} />
          }
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
