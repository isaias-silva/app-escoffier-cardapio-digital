import React from 'react'
import loadImage from '../../../public/load.webp'
export default function LoadComponent() {
  return (
    <div className="load-div">
        <img src={loadImage.src} alt="" />
    </div>
  )
}
