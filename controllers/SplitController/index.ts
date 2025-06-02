import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

const useSplitController = () => {
    const defaultValues = useMemo(() => {
        return {
            resto: '',
            sub_total: 0,
            tax: 0,
            service_charge: 0,
            discounts: 0,
            others: 0,
            total_amount: 0,
            items: [
                {
                    name: '',
                    price: 0,
                    quantity: 0,
                    total: 0,
                }
            ],
            persons: []
        }
    }, [])
    
    const form = useForm({ defaultValues, mode: 'onChange' })
    const addItem = () => {
        const { setValue, getValues } = form
        setValue('items', [...getValues('items'), {
            name: '',
            price: 0,
            quantity: 0,
            total: 0
        }])
    }

    useEffect(() => {
        const { watch, setValue } = form
        const subTotal = watch('sub_total')
        const tax = watch('tax')
        const serviceCharge = watch('service_charge')
        const discounts = watch('discounts')
        const others = watch('others')
        const totalAmount = subTotal + tax + serviceCharge - discounts + others
        setValue('total_amount', totalAmount)

    }, [form.watch('sub_total'), form.watch('tax'), form.watch('service_charge'), form.watch('discounts'), form.watch('others')])

    const splitBill = () => {
        const { getValues } = form
        const items = getValues('items')
        const numberOfPeople = 5 // replace with actual number of people

        const totalAmount = getValues('total_amount')
        const amountPerPerson = totalAmount / numberOfPeople
        console.log(amountPerPerson)
        return { amountPerPerson }
    }

    return {
        form,
        addItem,
        splitBill
    }
}

export default useSplitController