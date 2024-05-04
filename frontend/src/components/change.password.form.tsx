import { useState } from "react"
import { EditPasswordInput } from "./inputs/edit.password.input"
import { Alert, LinearProgress } from "@mui/material"
import { updateRestaurant } from "../app/api/services/restaurant.service"
import { delay } from "../core/utils/delay"

export function ChangePasswordForm() {
    const [password, setPassword] = useState<string>()
    const [passwordRepite, setPasswordRepite] = useState<string>()
    const [message, setMessage] = useState<{ type: 'success' | 'info' | 'error' | 'warning', text: string }>({
        type: 'info',
        text: ` Uma senha segura deve conter uma combinação de letras maiúsculas e minúsculas, números e caracteres especiais. Evite usar informações pessoais óbvias, como seu nome ou data de nascimento.
    `})
    const [load, setLoad] = useState<boolean>(false)
    const updatePassword = async () => {
        if (!password || !passwordRepite) {
            return setMessage({ type: 'error', text: 'preencha todos os campos!' })
        }
        if (password != passwordRepite) {
            return setMessage({ type: 'error', text: 'as senhas devem ser iguais!' })

        }
        try {
            setLoad(true)
            await delay(3)
            const res = await updateRestaurant({ password })

            setMessage({ type: 'success', text: res?.data.message || "dados atualizados" })

        } catch (err: any) {
            setMessage({ type: 'error', text: err.response.data.message || "erro interno no servidor." })

        } finally {
            setLoad(false)
        }
    }

    return <div>
        <p>Para redefinir sua senha, por favor insira uma nova senha nos campos abaixo:</p>

        {!load && <Alert severity={message?.type}>
            <p>
                {message?.text}
            </p>
        </Alert>}
        {load &&
        <LinearProgress />}
        <EditPasswordInput placeholder="nova senha" valueState={{ value: password, setValue: setPassword }} />
        <EditPasswordInput placeholder="repita a senha" valueState={{ value: passwordRepite, setValue: setPasswordRepite }} />

       
 {    !load &&   <button onClick={() => updatePassword()} className="bg-orange-500 text-white font-bold p-2 rounded-lg my-2 transition-all duration-300 hover:bg-orange-300">Confirmar</button>
  }  </div>


}