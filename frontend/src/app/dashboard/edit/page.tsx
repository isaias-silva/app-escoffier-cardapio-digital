"use client"
import React, { useEffect, useState } from 'react'
import { getMyRestaurant, getRestaurant, logout } from '../../../app/api/services/restaurant.service'
import { Restaurant } from '../../../core/interfaces/restaurant.interface'
import { useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import LoadComponent from '../../../components/load.component'

import { LateralNavMenu } from '../../../components/menu.nav.lateral'
import { EditImageInput } from '../../../components/edit.image.input'

export default function Page() {

  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isMe, setIsMe] = useState<boolean>(true)
  const [load, setLoad] = useState<boolean>(true)

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resume, setResume] = useState<string>('');
  const [profile, setProfile] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);

  const params = useSearchParams()
  useEffect(() => {
    refreshRestaurant()
  }, [router, params])


  const refreshRestaurant = () => {
    let restaurantId = params?.get('restaurant')
    if (restaurantId) {

      getRestaurant(restaurantId).then(res => {
        setRestaurant(res?.data)
        setLoad(false)
      }).catch(() => router.replace('/error'))

      setIsMe(false)


    } else {
      setIsMe(true)
      getMyRestaurant().then(res => {
        if (!res) {
          logout();
          router.replace('/')
        }
        setRestaurant(res?.data)

        setLoad(false)
      })
        .catch(() => { logout(); router.replace('/') })

    }
  }

  return (
    <div className="bg-orange-100 min-h-screen w-full">
      {load && <LoadComponent />}
      {isMe && <LateralNavMenu />}
      <div className="bg-orange-500 py-6  relative">
        <div className="container mx-auto px-4">
          <div className="sm:flex-row flex-col justify-center items-center px-2 pt-2 ">
            <EditImageInput
              modePreview='background'
              imageState={{ image: background, setImage: setBackground }}
              default={restaurant?.background} />


            <EditImageInput
              modePreview='profile'
              imageState={{ image: profile, setImage: setProfile }}
              default={restaurant?.profile} />

            <div className="ml-6 text-white z-20">
              <h1 className="text-3xl font-bold">{restaurant?.name || "sem nome"}</h1>

              <p className="mt-2 w-[60%] text-sm">{restaurant?.resume
                || 'sem descrição'}</p>
              {isMe ? <Link className=' font-bold hover:underline' target='_blank' href={`/dashboard?restaurant=${restaurant?.id}`}>link público</Link> : null}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
