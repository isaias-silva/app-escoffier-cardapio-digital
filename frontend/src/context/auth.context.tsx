"use client"

import React, { createContext, useEffect, useState } from 'react'
import { getMyRestaurant, getRestaurant, logout } from '../app/api/services/restaurant.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { Restaurant } from '../core/interfaces/restaurant.interface';
import { delay } from '../core/utils/delay';

interface IAuthContext {
  restaurant?: Restaurant
  refreshRestaurant?: () => Promise<void>,
  logoutRestaurant?: () => Promise<void>,
  isMe?: boolean,

}
export const AuthContext = createContext<IAuthContext>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isMe, setIsMe] = useState<boolean>(false)
  const [restaurant, setRestaurant] = useState<Restaurant>()

  const searchParams = useSearchParams();

  const router = useRouter()

  const refreshRestaurant = async () => {

    let restaurantId = searchParams?.get('restaurant')


    setIsMe(restaurantId ? false : true)

    const res = await (restaurantId ? getRestaurant(restaurantId) : getMyRestaurant())
    if (res?.status != 200) {
      router.replace('/')
    }
    await delay(2)

    setRestaurant(res?.data)
  }

  const logoutRestaurant = async () => {
    logout()
    setIsMe(false)
    setRestaurant(undefined);

  }
  useEffect(() => {
    refreshRestaurant()
  }, [searchParams, router])

  return (

    <AuthContext.Provider value={{ restaurant, refreshRestaurant, isMe, logoutRestaurant }}>
      {children}
    </AuthContext.Provider>
  )
}
