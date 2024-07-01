import { PersonComplete } from "@/types/PersonComplete"
import * as api from "@/api/admin";
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { escapeCPF } from "@/utils/escapeCPF";

type Props = {
    person: PersonComplete;
    refreshAction: () => void;
}
export const PersonEdit = ({ person, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().min(11, 'Prencha o CPF')

    });

    const handleSaveButton = async () => {
        if(errors.length > 0 ) return;
        setLoading(true);
        const updatedPerson = await api.updatePerson(
             person.id_event, person.id_group, person.id, {
                name: nameField, cpf: cpfField
             }
        );
        setLoading(false);
        if (updatedPerson) {
            refreshAction();
        } else {
            alert('Ocorreu um erro');
        }
    }

    useEffect(()=>{
        setErrors([]);
        const data = personSchema.safeParse({nameField, cpfField});
        if(!data.success) setErrors(getErrorFromZod(data.error));
    }, [nameField, cpfField]);

    return (
        <div>
            <h4 className="text-xl">Edit Person</h4>

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

            <div className="flex gap-3">
                <Button
                    value="Cancel"
                    onClick={refreshAction}
                    disabled={loading}
                />

                <Button
                    value={loading ? 'Saving...' : 'Save'}
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>

        </div>
    )
}