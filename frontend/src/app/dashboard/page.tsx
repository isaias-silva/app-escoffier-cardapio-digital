"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { getMyRestaurant, getRestaurant, logout } from '../../app/api/services/restaurant.service'
import { Restaurant } from '../../interfaces/restaurant.interface'
import { useRouter, useSearchParams } from 'next/navigation'
import MenusList from '../../app/components/menus.list'
import CategoryList from '../../app/components/category.list'
import MenuEditRestaurant from '../../app/components/menu.edit.restaurant'
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link'

export default function () {

  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isMe, setIsMe] = useState<boolean>(true)
  const params = useSearchParams()
  useEffect(() => {
    refreshRestaurant()
  }, [router])

  const refreshRestaurant = () => {
    let restaurantId = params?.get('restaurant')
    if (restaurantId) {

      getRestaurant(restaurantId).then(res => setRestaurant(res?.data)).catch(() => router.replace('/error'))
      setIsMe(false)


    } else {
      setIsMe(true)
      getMyRestaurant().then(res => setRestaurant(res?.data)).catch(()=>{logout(); router.replace('/')})

    }
  }

  return (
    <div className="bg-orange-100 min-h-screen w-full">
      {isMe && <MenuEditRestaurant callback={refreshRestaurant} restaurant={restaurant} />}
      {isMe && <Link onClick={()=>logout()} href="/" className='flex justify-center items-center absolute right-0 top-0 w-[100px] h-[50px] bg-orange-300 transition-all duration-200 rounded-lg hover:scale-105'>
        <LogoutIcon />
        Sair </Link>}
      <div className="bg-orange-500 py-6">
        <div className="container mx-auto px-4">
          <div className="sm:flex-row flex-col justify-center items-center px-2 pt-2">
            <img className="md:w-56 w-[200px] rounded-full border-orange-400 border-2  h-[210px]" src={restaurant?.profile || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Restaurant" />
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">{restaurant?.name || "sem nome"}</h1>

              <p className="mt-2 w-[60%] text-sm">{restaurant?.resume
                || 'sem descrição'}</p>


            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Cardápios</h2>
          <MenusList isMe id={restaurant?.id} />
        </div>
      </div>

      {isMe ? <div className="container mx-auto px-4 py-8">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Categorias</h2>
          <CategoryList />
        </div>
      </div> : null}
    </div>
  )
}
