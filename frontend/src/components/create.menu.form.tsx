import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { createRestaurantMenu } from '../app/api/services/menu.service';

export default function CreateMenuForm({ handleOpen, open, setOpen, callback }: { open: boolean, setOpen: Function, handleOpen: Function, callback?: Function }) {

    const handleClose = () => {
        setOpen(false);
        if (callback) {
            callback()
        }
    };
    const [name, setName] = useState<string>()
    const [error, setError] = useState<string>()
    function createMenu() {
        setError(undefined)
        if (!name) {
            setError("nome é obrigatório")
            return
        }
        if (name?.length < 4 || name?.length > 30) {
            setError("nome deve ter de 4 a 30 digitos.")
            return
        }
        createRestaurantMenu({ name }).then(res => { handleClose() }).catch(err => { setError(err.response.data.message) })
    }
    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-30"></div>
                <div className="bg-orange-200 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-sm w-full">
                    <div className="px-6 py-4">
                        <h2 className="text-lg font-semibold mb-4">Criar Cardápio</h2>
                        {error ? <p className=' text-red-600 bg-red-300 p-3 rounded-lg my-4'>{error}</p> : null}
                        <form >
                            <input
                                type="text"
                                placeholder="Nome do Cardápio"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="border border-gray-300 px-3 py-2 w-full rounded-lg mb-2 focus:outline-none focus:ring-orange-400"
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={() => createMenu()}
                                    type="button"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                                >
                                    Adicionar
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
