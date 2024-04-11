"use client"

import React, { useEffect } from 'react'
import { getMyRestaurant, logout } from '../app/api/services/restaurant.service'
import { useRouter } from 'next/navigation'


export default function IsAuth({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  useEffect(()=>{
    getMyRestaurant()
    .then(data => {
      console.log(data)
      if (data?.status == 200) {
        router.replace('/dashboard')
      } else {
        logout()
      }
    })
    .catch(err => {
      logout()

    })
  },[router])


  return (
    <div>
      {children}
    </div>
  )
}
