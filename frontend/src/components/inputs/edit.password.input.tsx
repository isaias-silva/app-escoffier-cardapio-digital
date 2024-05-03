import { Dispatch, SetStateAction, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export function EditPasswordInput(props: {
    placeholder?:string,
    valueState: {
        value: string | undefined,
        setValue: Dispatch<SetStateAction<string | undefined>>
    }
}) {

    const { valueState,placeholder } = props
    const [view, setView] = useState<boolean>(false)
    return <div className="flex justify-between max-w-[300px] border-gray-600 border my-2 p-2 rounded-md">
        <input placeholder={placeholder} value={valueState.value} onChange={(ev)=>valueState.setValue(ev.target.value)} className="  focus:outline-none focus:ring-transparent bg-transparent" type={view ? 'text' : 'password'} />
        <button onClick={()=>setView(!view)}>{view?<VisibilityOffIcon/>:<VisibilityIcon/>}</button>
    </div>
}