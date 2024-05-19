import React, { useContext } from 'react'
import { PalleteContext } from '../../context/pallete.context'

export default function LoadComponent() {
  const {pallete}=useContext(PalleteContext)
 
  return (
    <div style={{background:pallete?.main||"#ce7800"}} className="load-div">
       <div className='load-block'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          
       
       </div>
    </div>
  )
}
