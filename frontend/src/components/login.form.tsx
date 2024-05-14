"use client"

import React, { useState } from 'react';
import { login, register, updatePasswordForgotten } from '../app/api/services/restaurant.service';
import { useRouter } from 'next/navigation';
import { Modal } from '@mui/material';
import LoadComponent from './load.component';
import { delay } from '../core/utils/delay';

export default function LoginForm () {

    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registerForm, setRegisterForm] = useState(false)

    const [open, setOpen] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    const handlerNewPassword = async () => {
        if (email && password && password.length > 4 && password.length < 20) {
            try {
                setLoad(true)
                const res = await updatePasswordForgotten(password, email)

                alert(res?.data.message)
                setOpen(false)
            } catch (err: any) {
                alert(err.response.data.message)
            } finally {
                setLoad(false)
            }
        }

    }
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
            setLoad(true)
            const req = registerForm ? register(name, email, password) : login(email, password)
            const result = await req
            if (result.status == 201) {
                await delay(3)
                router.replace('/dashboard')
            }
        } catch (error: any) {

            console.log(error)
            setError(error.response?.data.message);
        } finally {
            setLoad(false)
        }

    };

    return (
        <div className="flex justify-center items-center h-screen">
            {load && <LoadComponent />}
            <Modal

                open={open}
                onClose={() => setOpen(false)}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-black opacity-30"></div>
                    <div className="bg-orange-200 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-sm w-full">
                        <div className="px-6 py-4">
                            <h2 className="text-lg font-semibold mb-4 text-center">Digite seu e-mail e sua nova senha</h2>

                            <form>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none focus:ring-orange-400"
                                />
                                <input
                                    type="password"
                                    placeholder="sua nova senha"
                                    value={password}
                                    onChange={(ev) => setPassword(ev.target.value)}
                                    className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none focus:ring-orange-400"
                                />
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => handlerNewPassword()}

                                        type="button"
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                                    >
                                        Solicitar redefinição de senha
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Modal>

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
                            {registerForm ? null : <li><span onClick={() => setOpen(true)} className='duration-300 transition-all hover:cursor-pointer text-orange-500 underline hover:text-orange-700'>Esqueceu sua senha?</span></li>}
                        </ul>

                    </div>
                </form>
            </div>
        </div>
    );
};
