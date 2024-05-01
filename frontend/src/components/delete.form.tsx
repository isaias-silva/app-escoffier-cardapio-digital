import { Modal } from '@mui/material'
import React from 'react'

export default function DeleteForm({ open, setOpen, callback, message }: {
    message: string,
    setOpen: Function,
    callback: Function,
    open: boolean
}) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
       
            className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
        >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
                <div className="px-6 py-4">
                    <h2 className='text-2xl mb-4'>{message}</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => { callback() }}
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                        >
                            Sim
                        </button>
                        <button
                            type="button"
                            onClick={() => { handleClose ()}}
                            className="text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </Modal>

    )
}
