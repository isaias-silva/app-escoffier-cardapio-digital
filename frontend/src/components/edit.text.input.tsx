import EditIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function EditTextInput(props: {
    callback?: () => Promise<void>

    max?: number,
    placeholder?: string,
    mode?: 'text-area' | 'input',
    default?: string,
    valueState: {
        value: string | undefined,
        setValue: Dispatch<SetStateAction<string | undefined>>
    }
}) {
    const [edit, setEdit] = useState<boolean>(false)
    const { value, setValue } = props.valueState
    const id = Math.random().toString(32).replace('0.', 'text-input-')

    const handleValue = (ev: any) => setValue(ev.target.value)
    const handleEdit = () => {
        if (value && !edit == false && props.callback) {
         
                props.callback()

            
        }
        setEdit(!edit)
    }
    useEffect(() => {
        setValue(props.default)
    }, [props.default])

    return <>
        {edit ? props.mode == 'text-area' ?
            <textarea id={id}
                value={value}
                maxLength={props.max}
                onChange={handleValue}
                className='bg-transparent w-[80%] max-w-[80%] h-[50px] resize-none focus:outline-none focus:ring-transparent border-b' >

            </textarea> :

            <input id={id} className=' mb-7 bg-transparent min-w-24 focus:outline-none focus:ring-transparent border-b'
                type='text'
                value={value}
                onChange={handleValue} />
            : value || props.default}

        <label htmlFor={id} onClick={handleEdit} className=" transition-all duration-300 opacity-25 hover:opacity-100 hover:cursor-pointer text-sm">{edit ? <SaveIcon /> : <EditIcon />}
        </label>


        {props?.max && value && edit && <p className={' opacity-50 ' + (value?.length == props.max ? ' text-red-600' : '')}>{value?.length}/{props.max}</p>}
    </>
}