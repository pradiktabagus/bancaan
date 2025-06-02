"use client"
import useSplitController from "@/controllers/SplitController";
import { Dialog } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

const AddPerson = dynamic(() => import('./addPerson'), { ssr: false })
const PickItems = dynamic(() => import('./pickItem'), { ssr: false })

export default function Split() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isPick, setPick] = useState<boolean>(false)
    const { form, addItem, splitBill } = useSplitController()
    const { control, register, setValue  } = form
    const { fields, update } = useFieldArray({ control, name: 'items' })

    // Function to calculate subtotal
    const calculateSubtotal = () => {
        return fields.reduce((acc, item) => acc + (item.total || 0), 0);
    };

    // Update subtotal whenever fields change using useEffect
    useEffect(() => {
        const newSubtotal = calculateSubtotal();
        setValue('sub_total', newSubtotal); // Update sub_total in form
    }, [fields, setValue]); // Include setValue in dependency array

    return (
      <div className="relative ">
        <div className="w-full shadow-md p-2">
            <h4 className="text-xl font-bold">
                Split Bill Items
            </h4>
        </div>
        <div className="p-2 pt-8">
            <div>
                <Controller
                    control={control}
                    name="resto"
                    render={({ field: { onChange, value }}) => (
                        <input 
                            onChange={onChange} 
                            value={value} 
                            aria-label="title-resto" 
                            placeholder="Resto" 
                            className="border-b p-1 w-full text-lg" />
                    )}
                 />
            </div>
            <div className="pt-4 flex flex-col gap-2">
                {fields.map((item, index) => (
                    <div className="w-full">
                        <div className="flex items-center justify-between gap-2" key={index}>
                            <input placeholder="Menu" className="border-b p-1 w-full text-sm font-mono" type="text" {...register(`items.${index}.name`)} />
                            <div className="flex items-center justify-between gap-2">
                                <input placeholder="qty" className="border-b p-1 w-10 text-sm font-mono [appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button]:appearance-none" type="number" {...register(`items.${index}.quantity`, {
                                    onChange: (e) => {
                                        const quantity = parseInt(e.target.value, 10);
                                        const price = item.price; // Get the current price
                                        update(index, {
                                          ...item, // Keep existing item data
                                          quantity,
                                          total: price * quantity, // Calculate and update total
                                        });
                                      },                      
                                } )}/>
                                <p className="text-sm font-mono">X</p>
                            </div>
                            <input placeholder="price" className="text-right border-b p-1 w-full text-sm font-mono [appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button]:appearance-none" type="number" {...register(`items.${index}.price`, {
                                onChange: (e) => {
                                    const price = parseInt(e.target.value, 10);
                                    const quantity = item.quantity; // Get the current quantity
                                    update(index, {
                                      ...item, // Keep existing item data
                                      price,
                                      total: price * quantity, // Calculate and update total
                                    });
                                  },
                            })}/>                        
                        </div>
                        <input disabled className="text-sm font-semibold font-mono text-right w-full p-1 [appearance:textfield] [&::-webkit-outer-spin-button] [&::-webkit-inner-spin-button]:appearance-none" type="number" value={item.total} />
                    </div>
                ))}
               
            </div>
            <div className="mt-4">
                <button onClick={addItem} type="button" className="text-blue-500">+ add item</button>
            </div>
            <div className="mt-8 border-t border-slate-500 p-1 w-full">
                <h4 className="text-md font-bold ">
                    Summary
                </h4>
                <div className="pt-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Sub Total</h6>
                        <Controller 
                            control={control} 
                            name="sub_total" 
                            render={({ field: {value, onChange} }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Tax</h6>
                        <Controller 
                            control={control} 
                            name="tax" 
                            render={({ field: {value, onChange} }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Service Charge</h6>
                        <Controller 
                            control={control} 
                            name="service_charge" 
                            render={({ field: {value, onChange} }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Discounts</h6>
                        <Controller 
                            control={control} 
                            name="discounts" 
                            render={({ field: {value, onChange} }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Others</h6>
                        <Controller 
                            control={control} 
                            name="others" 
                            render={({ field: { value, onChange } }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <h6 className="text-sm font-bold font-mono">Total Amount</h6>
                        <Controller 
                            control={control} 
                            name="total_amount" 
                            render={({ field: {value, onChange} }) => (
                                <input className="text-right font-mono" placeholder="-" value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                        )} />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full shadow-md p-2 fixed bottom-0 right-0 left-0">
            <button type="button" onClick={() => setIsOpen(true)} className="w-full bg-green-500 text-white p-1 rounded-md leading-7">Confirm Result</button>
        </div>
        {isOpen && 
            <Dialog 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
                fullScreen
                >
                <AddPerson handleNext={() => { setIsOpen(false), setPick(true)}} handleClose={() => setIsOpen(false)} />
            </Dialog>
        }
        {isPick && 
            <Dialog 
                open={isPick} 
                onClose={() => setPick(false)} 
                fullScreen
                >
                <PickItems handleSplit={() => console.log('')} handleClose={() => setPick(false)} />
            </Dialog>
        }
      </div>
    );
  }
  