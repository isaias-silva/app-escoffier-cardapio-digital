"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { confirmCode } from '../api/services/restaurant.service';

export default function page() {
    const [code, setCode] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('');
    const params = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const mail = params.get('email')

        if (!mail) {
            router.replace('/')
        }
    }, [router])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setVerificationStatus('')
        const mail = params.get('email')?.replace(" ", "+")
      
        if (mail) {
            try {
                const res = await confirmCode(code, mail)

                setVerificationStatus(res?.data.message || 'código validado!');


                router.replace('/')

            } catch (err: any) {
                console.log(err)
                setVerificationStatus(err.response.data.message || 'Código inválido')
            }
        } else {
            setVerificationStatus('Código inválido')

        }
    };

    return (
        <div className="bg-orange-200 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Verificação de Código</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">

                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={handleInputChange}
                            placeholder='Digite o Código'
                            className="mt-1 block w-full h-[40px] p-2 text-2xl border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">Verificar</button>
                </form>
                <p className="mt-4 text-center">{verificationStatus}</p>
            </div>
        </div>
    );
};


