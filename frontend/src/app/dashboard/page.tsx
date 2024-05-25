"use client"
import React, { useContext, useEffect,useMemo,useState } from 'react'
import MenusList from '../../components/lists/menus.list'
import CategoryList from '../../components/lists/category.list'
import Link from 'next/link'
import LoadComponent from '../../components/utils/load.component'
import { LateralNavControl} from '../../components/controls/menu.nav.control'
import { AuthContext} from '../../context/auth.context'
import { PalleteContext } from '../../context/pallete.context'
import { useRouter } from 'next/navigation'
import { getToken } from '../api/services/restaurant.service'

export default function Page() {

  

  const { restaurant, refreshRestaurant,isMe } = useContext(AuthContext)
  const {pallete,refreshPallete}=useContext(PalleteContext)
  const [load, setLoad] = useState<boolean>(true)
  
  
  useEffect(() => {
    if (refreshRestaurant) {
      refreshRestaurant().then(()=>{
        if(refreshPallete){

          refreshPallete()
     
        }
        setLoad(false)});
    }
  }, [refreshRestaurant]);

  useMemo(()=>{
    if(!restaurant){}
  },[restaurant])

  


  return (
  
      <div style={{ background: pallete?.main || "#ffedd5" }} className=" min-h-screen w-full">
        {load && <LoadComponent />}
        {isMe && <LateralNavControl />}
        <div style={{ background: pallete?.primary || "#f97316" }} className=" py-6  relative">
          <div className="container mx-auto px-4">
            <div className="sm:flex-row flex-col justify-center items-center px-2 pt-2 ">

              <img src={restaurant?.['background'] || "https://t3.ftcdn.net/jpg/05/79/48/54/360_F_579485400_8jSrBgNQP1BWUOjWujmRS79YJmzQv6fw.jpg"} alt="banner" className='absolute -top-[80%] sm:-top-[55%]  left-0 w-full h-[100%] z-[1]' />

              <img style={{ borderColor: pallete?.primary || "#f97316" }} className="relative z-[2] md:w-56 w-[200px] rounded-full sm:border-4 border-2 h-[210px] m-auto sm:m-0" src={restaurant?.profile || "https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png"} alt="Restaurant" />
              <div className="ml-6 z-20 relative" style={{color:pallete?.font||'#fff'}}>
                <h1 className="text-3xl font-bold">{restaurant?.name || "sem nome"}</h1>

                <p className="my-2 w-[100%] sm:w-[60%] text-sm">{restaurant?.resume
                  || 'sem descrição'}</p>
                {isMe ? <Link className=' font-bold hover:underline' target='_blank' href={`/dashboard?restaurant=${restaurant?.id}`}>link público</Link> : null}

              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8" >
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Cardápios</h2>
           {<MenusList />}
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
