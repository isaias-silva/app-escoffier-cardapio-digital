"use client"
import React, { useEffect, useState } from 'react'
import { getMyRestaurant, getRestaurant, logout, updateBackground, updateProfile, updateRestaurant } from '../../../app/api/services/restaurant.service'
import { Restaurant } from '../../../core/interfaces/restaurant.interface'
import { useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import LoadComponent from '../../../components/load.component'

import { LateralNavMenu } from '../../../components/menu.nav.lateral'
import { EditImageInput } from '../../../components/edit.image.input'
import { EditTextInput } from '../../../components/edit.text.input'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

export default function Page() {

  const router = useRouter()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [isMe, setIsMe] = useState<boolean>(true)
  const [load, setLoad] = useState<boolean>(true)

  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [resume, setResume] = useState<string | undefined>();

  const [profile, setProfile] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);

  const updateImagesCallback = async () => {
    try {

      if (profile) {

        await updateProfile(profile)

      }
      if (background) {
        await updateBackground(background)
      }

      toast.success("imagem atualizada!")
   
    } catch (err: any) {
      toast.error(`Erro ao atualizar imagem: ${err.response.data.message}`)

    }finally{
      setProfile(null)
      setBackground(null)

    }
  }
  const updateRestaurantCallback = async () => {

    const objectUpdate = {
      name: name != restaurant?.name ? name : undefined,
      email: email != restaurant?.email ? email : undefined,
      resume: resume != restaurant?.resume ? resume : undefined,

    }

    try {

      if (objectUpdate.name || objectUpdate.email || objectUpdate.resume) {

        const res = await updateRestaurant(objectUpdate)

        toast.success(res?.data.message)

        refreshRestaurant()
      }


    } catch (err: any) {
      toast.error(`Erro ao atualizar: ${err.response.data.message}`)

      setName(restaurant?.name)
      setResume(restaurant?.resume)
      setEmail(restaurant?.email)
    }

  }

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
      <ToastContainer />
      {load && <LoadComponent />}
      {isMe && <LateralNavMenu />}

      <div className="bg-orange-500 py-6  relative">
        <div className="container mx-auto px-4">
          <div className="sm:flex-row flex-col justify-center items-center px-2 pt-2 ">
            <EditImageInput
              modePreview='background'
              imageState={{ image: background, setImage: setBackground }}
              default={restaurant?.background}
              callback={updateImagesCallback}

            />


            <EditImageInput
              modePreview='profile'
              imageState={{ image: profile, setImage: setProfile }}
              default={restaurant?.profile}
              callback={updateImagesCallback}

            />

            <div className="ml-6 text-white z-20">
              <h1 className="text-3xl font-bold"> <EditTextInput
                default={restaurant?.name}
                valueState={{ value: name, setValue: setName }}

                callback={updateRestaurantCallback}
              /></h1>

              <p><EditTextInput
                default={restaurant?.email}
                valueState={{ value: email, setValue: setEmail }}
                callback={updateRestaurantCallback}

              /></p>

              <p className="mt-2 w-[60%] text-sm">
                <EditTextInput default={restaurant?.resume || 'sem descrição'}
                  valueState={{ value: resume, setValue: setResume }}
                  mode='text-area'
                  max={300}
                  callback={updateRestaurantCallback}

                /></p>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
