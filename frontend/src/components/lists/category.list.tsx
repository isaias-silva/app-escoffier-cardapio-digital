
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteCategory, getMyCategories } from '../../app/api/services/category.service'
import CategoryForm from '../forms/category.form';
import DeleteForm from '../forms/delete.form';

export default function CategoryList() {
    const [categories, setCategories] = useState<{ name: string, keywords: string[], id: string }[]>([])
    const [id, setId] = useState<string>()

    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate(true);

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const handleOpenUpdate = (id: string) => {
        setId(id)
        setOpenUpdate(true)
    };

    const [openDelete, setOpenDelete] = React.useState(false);

    const handleOpenDelete = (id: string) => {
        setId(id)
        setOpenDelete(true)
    };
    const deleteCategoryCallback = async () => {
        if (id) {
            await deleteCategory({ id, many: false })
            refreshCategories()
            setOpenDelete(false)
        }
    }
    const refreshCategories = () => getMyCategories().then((res) => setCategories(res)).catch(err=>setCategories([]))

    useEffect(() => {
        refreshCategories();
    }, []);

    return (

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <CategoryForm open={openCreate}

                setOpen={setOpenCreate}
                update={false}
                callback={refreshCategories} />

            <CategoryForm open={openUpdate}

                setOpen={setOpenUpdate}
                update={true}
                id={id}
                callback={refreshCategories}
            />

            <DeleteForm
                open={openDelete}
                setOpen={setOpenDelete}
                message='Deseja mesmo deletar a categoria?'
                callback={deleteCategoryCallback}
            />
            {categories.map((category,i) =>
                <div key={i} className=" relative bg-white rounded-lg shadow-md transition-all duration-300 p-6">
                    <div className="flex absolute top-0 right-0">
                        <button onClick={() => handleOpenUpdate(category.id)} className='transition-all duration-300 hover:text-orange-300'><EditIcon /></button>
                        <button onClick={() => handleOpenDelete(category.id)} className='transition-all duration-300 hover:text-red-500'><DeleteIcon /></button>
                    </div>
                    <div className="text-gray-800 font-semibold">{category.name}</div>
                    {category.keywords.map((key,index) => <span key={index} className="p-2 inline-block m-1  font-bold bg-orange-300 rounded-xl text-sm">{key}</span>)}
                </div>


            )}{

                <button className='bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-105' >
                    <h2 className='text-2xl' onClick={handleOpenCreate}>+</h2>
                </button>}
        </div>
    )
}
