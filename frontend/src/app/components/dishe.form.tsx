import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { getMyCategories } from "../api/services/category.service";
import { createDishe, updateDisheProfile } from "../api/services/dishe.service";
export default function DisheForm ({ open, setOpen, create, menuId, callback }: { callback?: Function, create: boolean, menuId: string, open: boolean, setOpen: Function }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [mode, setMode] = useState<'night' | 'mornning'>('mornning');
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ name: string, id: string }[]>([])
    const [message, setMessage] = useState<{ type: 'error' | 'warn', text: string }>()

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = async (e: any) => {
        e.preventDefault();
        setMessage(undefined)

        if (create) {
            if (!name || !price || !mode || !description || !category) {
                setMessage({ text: 'preencha todas as informações', type: 'error' })
                return
            }


            const data = {
                name,
                mode,
                description,
                menuId,
                price,
                categoryId: category
            }

            createDishe(data).then((res) => {
               
                if (image) {
                    updateDisheProfile(res.data.id, image)
                }

                setMessage({ type: 'warn', text: res.data.message })

                if (callback) {
                    callback()
                }
                setOpen(false)
            }).catch((err: any) => {
                setMessage({ type: 'error', text: typeof(err.response.data.message)=='string'?err.response.data.message:err.response.data.message.join(', ') })
            })




        }
    }
    useEffect(() => {
        getMyCategories().then(res => setCategories(res))
    }, [])
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.includes("image")) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null)
            setPreviewImage('./invalid-image.jpg')
        }
    }
    return (
        <>
            <Modal open={open} onClose={handleClose} className="overflow-y-scroll" >
                <form onSubmit={handleSave} className="bg-orange-100 p-8 rounded-md shadow-md m-auto sm:w-1/2 w-full sm:mt-20 ">
                    {message && <p className={message.type == 'error' ? 'bg-red-300 text-red-600 p-2 m-auto rounded-lg' : 'bg-green-300 text-green-600 p-2 m-auto rounded-lg'}>{message?.text}</p>}

                    <div className="mb-4">

                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className=" hidden"
                        />
                        <label htmlFor="image" className='m-auto h-[200px] w-[200px] flex justify-center items-center'>
                            <img src={previewImage || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Preview" className=" w-full h-full mt-2 rounded-lg duration-200 transition-all hover:cursor-pointer hover:scale-110" />
                        </label>

                    </div>
                    <label className="block text-gray-700 font-bold mb-2">Nome do Prato</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={name}
                        placeholder="nome do prato"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="block text-gray-700 font-bold mt-4">Preço</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={price}
                        placeholder="preço do prato (R$)"

                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />

                    <label className="block text-gray-700 font-bold mt-4">category</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={category}

                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Selecione a categoria </option>
                        {categories.map((category, i) => {
                            return <option value={category.id} key={i}>{category.name}</option>
                        })}
                    </select>

                    <label className="block text-gray-700 font-bold mt-4">Descrição</label>
                    <textarea
                        className="w-full h-20 max-h-40 min-h-16 border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={description}
                        placeholder="descrição do prato"

                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <label className="block text-gray-700 font-bold mt-4">Momento do Dia</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={mode}
                        onChange={(e) => {
                            if (e.target.value == 'night' || e.target.value == 'mornning') {
                                setMode(e.target.value)
                            }
                        }}
                    >
                        <option value="night">Noturno</option>
                        <option value="mornning">Diurno</option>
                    </select>

                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md mt-4"

                    >
                        Salvar Prato
                    </button>
                </form>
            </Modal>
        </>
    )
}