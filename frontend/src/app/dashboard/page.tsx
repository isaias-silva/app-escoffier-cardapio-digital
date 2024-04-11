import { getServerSession } from 'next-auth'
import React from 'react'

export default async function() {
    const session=getServerSession()
  return (
    <div>Dashboard</div>
  )
}
