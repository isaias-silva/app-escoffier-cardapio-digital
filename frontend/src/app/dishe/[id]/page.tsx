"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Dishe } from '../../../interfaces/dishe.interface';
import { getDishe } from '../../api/services/dishe.service';
import DisheControl from '../../components/dishe.control';
import MoonIcon from '@mui/icons-material/Bedtime';
import SunIcon from '@mui/icons-material/Brightness7';
export default function Page() {
  const params = useParams();
  const [dishe, setDishe] = useState<Dishe>();

  useEffect(() => {
    refreshDishe();
    console.log(dishe)
  }, [params]);

  const refreshDishe = () => {
    if (params?.id) {
      getDishe(params?.id.toString()).then((disheRes) => {
        disheRes.id = params?.id.toString()
        setDishe(disheRes)
      });
    }
  };

  return (
    <>
      {dishe && <DisheControl dishe={dishe} />
      }   <div className="sm:flex justify-center w-screen sm:h-screen h-full">
        <div className=" sm:h-full sm:w-1/2 w-full">
          <img src={dishe?.image} alt={dishe?.name} className=" w-full h-full object-cover" />
        </div>
        <div  className="relative w-full px-4 py-8 md:px-8 md:py-16 bg-orange-100 rounded-lg h-full">
          <h2 className="text-3xl font-bold text-orange-600">{dishe?.name}</h2>
          <p className="mt-4 text-gray-700">{dishe?.description}</p>
          <div className={`sm:w-1/3 w-1/2 m-2 p-2 shadow-2xl ${dishe?.mode == 'night' ? 'bg-blue-950' : 'bg-orange-400'} rounded-xl font-bold text-white border-2 border-white`}>{dishe?.mode == 'mornning' ? <><SunIcon /> este é um prato diurno</> : <> <MoonIcon /> este é um prato noturno</>}</div>

          <div className='my-5'>
            {dishe?.category?.keywords.map((keyword, i) => <span key={i} className=" shadow-xl inline-block m-1 p-1 bg-orange-300 rounded-xl text-sm">{keyword}</span>)}
          </div>

          <p className="mt-4  font-bold text-2xl text-orange-700"> R$ {dishe?.price?.toFixed(2)}</p>

        </div>


      </div>
    </>
  );
}
