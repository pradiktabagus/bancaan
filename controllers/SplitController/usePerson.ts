import { useForm } from "react-hook-form"

const usePerson = () => {
    const formPerson = useForm({ defaultValues: { 
        name: '',
        names: [{
            name: 'you'
        }] 
    }, mode: 'onChange'})

    const handleAddPerson = () => {
        const { setValue, getValues } = formPerson
        const newNames = [...getValues().names, {name: getValues().name}]
        setValue('names', newNames)
        setValue('name', '')
    }

    const handleRemove = (index: number) => {
        const { setValue, getValues } = formPerson
        const newNames = getValues().names.filter((_, i) => i !== index)
        setValue('names', newNames)
    }

    return {
        formPerson,
        handleAddPerson,
        handleRemove
    }
}

export default usePerson