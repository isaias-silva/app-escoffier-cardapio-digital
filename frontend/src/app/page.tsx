
"use client"

import { useContext, useEffect } from "react";
import LoginForm from "../components/forms/login.form";
import { AuthContext } from "../context/auth.context";
import { useRouter } from "next/navigation";
import { getToken } from "./api/services/restaurant.service";


export default function Home() {

  
  const router = useRouter()
  useEffect(() => {
    
    if(getToken()){
      
     return router.push('/dashboard')
    }
  }, [router])
  return (

    <main className="bg-login">

      <LoginForm></LoginForm>
    </main>

  );
}
