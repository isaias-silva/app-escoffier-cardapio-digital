"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { getMyRestaurant, getRestaurant } from '../api/services/restaurant.service'
import { Restaurant } from '../../interfaces/restaurant.interface'
import { useRouter, useSearchParams } from 'next/navigation'
import MenusList from '../components/menus.list'
import CategoryList from '../components/category.list'
import MenuEditRestaurant from '../components/menu.edit.restaurant'

export default function () {

  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isMe, setIsMe] = useState<boolean>(true)
  const params = useSearchParams()
  useEffect(() => {
    refreshRestaurant()
  }, [router])

  const refreshRestaurant = () => {
    let restaurantId = params.get('restaurant')
    if (restaurantId) {

      getRestaurant(restaurantId).then(res => setRestaurant(res?.data)).catch(() => router.replace('/error'))
      setIsMe(false)


    } else {
      setIsMe(true)
      getMyRestaurant().then(res => setRestaurant(res?.data)).catch(err => setRestaurant(undefined))

    }
  }

  return (
    <div className="bg-orange-100 min-h-screen w-full">
     <MenuEditRestaurant/>
      <div className="bg-orange-500 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center px-2">
            <img className="rounded-lg md:w-56 w-[40%]" src={restaurant?.profile || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Restaurant" />
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">{restaurant?.name || "sem nome"}</h1>
             
              <p className="mt-2 w-[60%] text-sm">{restaurant?.resume || 'sem descrição'}</p>


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
