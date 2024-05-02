import { Dispatch, SetStateAction, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';


export function EditImageInput(props: {
    callback: () => Promise<void>
    imageState: {
        image: File | null, setImage: Dispatch<SetStateAction<File | null>>
    },
    default?: string
    modePreview: 'profile' | 'background'
}) {

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { setImage } = props.imageState
    const id = Math.random().toString(32).replace('0.', 'image-input-')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.includes("image")) {
            setImage(file);
            const reader = new FileReader();
            props.callback()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);

            };
            reader.readAsDataURL(file);



        } else if (file && !file?.type.includes("image")) {
            setPreviewImage('/invalid-image.jpg')
        }
        else {
            setImage(null)

        }
    }
    return <>
        <input
            type="file"
            id={id}
            accept="image/*"
            onChange={handleImageChange}
            className=" hidden"
        />
        {props.modePreview == 'profile' ? <label htmlFor={id} className='block relative z-[2] md:w-56 w-[200px] rounded-full border-orange-500 sm:border-4 border-2 h-[210px] m-auto sm:m-0 overflow-hidden'>

            <img className="transition-transform duration-300 relative w-full h-full m-auto sm:m-0 hover:scale-150 hover:cursor-pointer profile-input" src={previewImage || props.default || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Restaurant" />
        </label> :
            <>
                <label htmlFor={id} className="transition-all duration-300  absolute z-[2] top-0 right-0 bg-orange-300 p-1 rounded-lg opacity-10 hover:cursor-pointer hover:opacity-100" >
                    <EditIcon />
                </label>
                <img src={previewImage || props.default || "https://t3.ftcdn.net/jpg/05/79/48/54/360_F_579485400_8jSrBgNQP1BWUOjWujmRS79YJmzQv6fw.jpg"} alt="banner" className='absolute -top-[40px] left-0 w-full h-[200px] z-[1]' />

            </>
        }


    </>
}