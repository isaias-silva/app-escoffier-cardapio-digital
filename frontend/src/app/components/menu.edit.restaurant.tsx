import { Modal } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';


export default function MenuEditRestaurant() {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [resume, setResume] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleClose = () => {
        setOpen(false);
        // Limpar campos do formulário ao fechar o modal
        setName('');
        setEmail('');
        setResume('');
        setImage(null);
        setPreviewImage(null);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="sm:p-6 p-2 bg-white w-full sm:w-1/3 sm:mt-10  m-auto rounded-lg adapt">
                    <h2 className="text-2xl mb-4 text-center">Editar Restaurante</h2>
                    <form>

                        <div className="mb-4">

                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className=" hidden"
                            />
                            <label htmlFor="image" className=' w-full flex justify-center items-center'>                            
                             <img src={previewImage || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Preview" className=" w-[200px] h-[200px] mt-2 rounded-full duration-200 transition-all hover:cursor-pointer hover:scale-110" />
                            </label>

                        </div>
                        <div className="mb-4">

                            <label htmlFor="name" className="block text-gray-700">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-orange-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-orange-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="resume" className="block text-gray-700">Descrição:</label>
                            <textarea
                                id="resume"
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                                className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-orange-400"
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <button className='absolute w-[100px] h-[50px] bg-orange-300 transition-all duration-200 rounded-lg hover:scale-105' onClick={() => setOpen(true)}>
                <EditIcon /> Editar
            </button>
        </>
    );
}
