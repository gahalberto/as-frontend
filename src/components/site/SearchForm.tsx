import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf:string) => void;
    loading: boolean;
}

export const SearchForm = ({onSearchButton, loading}: Props) => {
    
    const [cpfInput, setCpfInput] = useState('');
   
    return(
        <div>
            <p className="mb-3 text-xl">Qual o seu CPF?</p>
            <input 
            type="text"
            inputMode="numeric"
            placeholder="Digite seu CPF"
            className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
            autoFocus 
            onChange={e => setCpfInput(escapeCPF(e.target.value))}
            value={cpfInput}
            disabled={loading}
            />
            
            <button className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-b-0 active:border-t-4 disabled:opacity-20"
            onClick={() => onSearchButton(cpfInput)} 
            >{loading ? 'Buscando...' : 'Entrar'}</button>
        </div>
    )
}