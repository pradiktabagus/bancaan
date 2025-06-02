import usePerson from "@/controllers/SplitController/usePerson"
import { Avatar, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material"
import { Fragment } from "react"
import { Controller } from "react-hook-form"

type ModalPersonProps = {
    handleClose: () => void
    handleNext: () =>  void
}

const Index = (props: ModalPersonProps) => {
    const { formPerson, handleAddPerson, handleRemove } = usePerson()
    const { control, watch } = formPerson

    return (
        <Fragment>
            <DialogTitle boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}>
                Persons
            </DialogTitle> 
            <DialogContent>
                <div className="p-4 pt-8 items-center">
                    <div className="flex">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <input placeholder="type name" className="border-b p-1 w-full text-lg" {...field} />
                            )}
                        />
                        <button onClick={handleAddPerson} className="w-[120px] text-blue-500">+ add</button>
                    </div>
                    <div className="mt-8 flex gap-5 flex-col">
                        {watch('names')?.map((person, i) => (
                            <div className="flex items-center gap-2" key={i}>
                                <Avatar />
                                <div className="w-full">
                                    <h4>{person.name}</h4>
                                </div>
                                {i !== 0 && 
                                    <button type="button" className="text-red-600 w-[120px]" onClick={() => handleRemove(i)}>
                                        remove
                                    </button>
                                }
                            </div>
                        ))}
                        
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <button type="button" onClick={props.handleClose} className="w-full text-black text-white p-1 rounded-md leading-7">Back</button>
                <button type="button" onClick={props.handleNext} className="w-full bg-green-500 text-white p-1 rounded-md leading-7">Next</button>
            </DialogActions>
        </Fragment>
    )
}

export default Index