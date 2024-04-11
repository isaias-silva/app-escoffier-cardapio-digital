"use client"

import React, { useState } from 'react';
import { login, register } from '../api/services/restaurant.service';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registerForm, setRegisterForm] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault();


        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            return;
        }
        if (registerForm && !name) {
            setError("Por favor, preencha todos os campos")
            return
        }

        if (password.length > 20 || password.length < 4) {
            setError("senha inválida, use no máximo 20 dígitos e no minimo 4 dígitos")
            return
        }
        if (registerForm && name.length < 4) {
            setError("nome muito curto, use no mínimo 4 digitos")
            return
        }
        if (registerForm && name.length > 30) {
            setError("nome muito longo, use no máximo 20 digitos")
            return
        }
        setError('')

        try {
            const req = registerForm ? register(name, email, password) : login(email, password)
            const result = await req
            if (result.status == 201) {
                router.replace('/dashboard')
            }
        } catch (error: any) {

            console.log(error)
            setError(error.response?.data.message);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-8 rounded shadow-md duration-300 transition-all ">
                <h2 className="text-xl font-bold mb-4 text-orange-700">{registerForm ? "Cadastre-se para editar seus cardápios" : "Entre para editar seus cardápios"}</h2>
                {error && <p className="text-red-500 text-center mb-4 bg-red-300 rounded-lg">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {registerForm ?
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">Nome:</label>
                            <input
                                type="text"

                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>
                        : null}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <button type="submit" className=" duration-300 transition-all w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">{registerForm ? "Cadastre-se" : "Entre"}</button>
                    <div>

                        <ul className='flex justify-center items-center flex-col'>
                            <li><span>{registerForm ? "já possui cadastro?" : "é novo aqui?"} <span onClick={() => { setRegisterForm(!registerForm); setError('') }} className='duration-300 transition-all hover:cursor-pointer text-orange-500 underline hover:text-orange-700'>{registerForm ? "entre" : "cadastre-se"}</span></span></li>
                       </ul>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;