import { Dispatch, SetStateAction, useState } from "react";

export function EditImageInput(props: { imageState: { image: File | null, setImage: Dispatch<SetStateAction<File | null>> }, default?: string }) {

    const [previewImage, setPreviewImage] = useState<string | null>(props.default || null);
    const { image, setImage } = props.imageState

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.includes("image")) {
            setImage(file);
            const reader = new FileReader();
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
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className=" hidden"
        />
        <label htmlFor="image" className='block relative z-[2] md:w-56 w-[200px] rounded-full border-orange-500 sm:border-4 border-2 h-[210px] m-auto sm:m-0 overflow-hidden'>
            <img className="transition-transform duration-300 relative w-full h-full m-auto sm:m-0 profile-input" src={previewImage || "https://cdn-icons-png.flaticon.com/512/433/433087.png"} alt="Restaurant" />
        </label>
    </>
}