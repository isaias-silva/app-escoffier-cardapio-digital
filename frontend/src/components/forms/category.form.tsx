import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createRestaurantMenu } from '../../app/api/services/menu.service';
import { createCategory, getCategory, updateCategory } from '../../app/api/services/category.service';

export default function CategoryForm({ open, setOpen, update, id, callback }: {
    open: boolean,
    setOpen: Function,
    update: boolean,
    callback?: Function,
    id?: string,
}) {

    const handleClose = () => {
        setOpen(false);
        if (callback) {
            callback()
        }
    };
    const [name, setName] = useState<string>()
    const [keywords, setkeywords] = useState<string>()
    const [error, setError] = useState<string>()
    const [category, setCategory] = useState<{ name: string, id: string, keywords: string[] }>()
    useEffect(() => {

        if (id) {
            getCategory(id).then(data => {
                setCategory(data)
                setName(data.name)
                setkeywords(data.keywords.join(','))
            })
        }

    }, [update, id])

    function request() {
        setError(undefined)
        if (!name || !keywords) {
            setError("preencha todos os campos")
            return
        }
        if (name?.length < 4 || name?.length > 30) {
            setError("nome deve ter de 4 a 30 digitos.")
            return
        }
        if (keywords.split(',').length < 1) {
            setError("adicione ao menos 1 palavra chave")
            return
        }

        (update && id ? updateCategory(id, { name, keywords: keywords.split(',') }) : createCategory({ name, keywords: keywords.split(',') })).then(res => { handleClose() }).catch(err => { setError(err.response.data.message) })
    }
    return (

        <Modal
            open={open}
            onClose={handleClose}
       
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-30"></div>
                <div className="bg-orange-200 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-sm w-full">
                    <div className="px-6 py-4">
                        <h2 className="text-lg font-semibold mb-4">{update ? "Atualizar categoria" : "Criar Categoria"}</h2>
                        {error ? <p className=' text-red-600 bg-red-300 p-3 rounded-lg my-4'>{error}</p> : null}
                        <form >
                            <input
                                type="text"
                                placeholder="Nome da categoria"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none focus:ring-orange-400"
                            />

                            <textarea
                                className="w-full h-24 p-2 border rounded-lg my-2 focus:outline-none focus:border-gray-500"
                                placeholder='palavras chave (separe por vírgula)'
                                value={keywords}
                                onChange={(ev) => setkeywords(ev.target.value)}
                            ></textarea>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => request()}
                                    type="button"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                                >
                                    {update ? "Atualizar" : "  Adicionar"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-orange-500 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
