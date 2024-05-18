"use client"
import React, { useContext, useEffect,useState } from 'react'
import MenusList from '../../components/menus.list'
import CategoryList from '../../components/category.list'
import Link from 'next/link'
import LoadComponent from '../../components/load.component'
import { LateralNavMenu } from '../../components/menu.nav.lateral'
import { AuthContext} from '../../context/auth.context'
import { PalleteContext } from '../../context/pallete.context'

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


  


  return (
  
      <div style={{ background: pallete?.main || "#ffedd5" }} className=" min-h-screen w-full">
        {load && <LoadComponent />}
        {isMe && <LateralNavMenu />}
        <div style={{ background: pallete?.primary || "#f97316" }} className=" py-6  relative">
          <div className="container mx-auto px-4">
            <div className="sm:flex-row flex-col justify-center items-center px-2 pt-2 ">

              <img src={restaurant?.['background'] || "https://t3.ftcdn.net/jpg/05/79/48/54/360_F_579485400_8jSrBgNQP1BWUOjWujmRS79YJmzQv6fw.jpg"} alt="banner" className='absolute -top-[80%] sm:-top-[55%]  left-0 w-full h-[100%] z-[1]' />

              <img style={{ borderColor: pallete?.primary || "#f97316" }} className="relative z-[2] md:w-56 w-[200px] rounded-full sm:border-4 border-2 h-[210px] m-auto sm:m-0" src={restaurant?.profile || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Restaurant" />
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
           {isMe && <MenusList isMe={isMe} id={restaurant?.id} />}
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
