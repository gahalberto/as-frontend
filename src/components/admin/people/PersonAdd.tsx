import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useState } from "react";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    eventId: number;
    groupId: number;
    refreshAction: ()=> void;
}
export const PersonAdd = ({eventId, groupId, refreshAction}:Props) => {
    const [nameField, setNameField] = useState('');
    const [cpfField, setCpfField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);
    

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().min(11, 'Prencha o CPF')

    });

    const handleSaveButton = async () => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if(!data.success) return setErrors(getErrorFromZod(data.error));
        setLoading(true);
        const newPerson = await api.addPerson(eventId, groupId, {
            name: nameField,
            cpf: cpfField
        });
        setLoading(false);
        if (newPerson) {
            setNameField('');
            setCpfField('');
            refreshAction();
        } else {
            alert('Ocorreu algum erro');
        }

    }

    return (
        <div>
            <h4 className="text-xl">New Person</h4>

            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Type a name"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
                disabled={loading}
            />
            <InputField 
                value={cpfField}
                onChange={e => setCpfField(escapeCPF(e.target.value))}
                placeholder="Type the CPF"
                errorMessage={errors.find(item => item.field === 'cpfField')?.message}
                disabled={loading}
            />

            <div>
                <Button 
                    value={loading ? 'Add...' : 'Add'}
                    onClick={handleSaveButton}
                />
            </div>

        </div>
    )
}