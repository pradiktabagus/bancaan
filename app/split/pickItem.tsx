import { DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { Fragment } from "react"

type ModalPersonProps = {
    handleClose: () => void
    handleSplit: () => void
}

const Index = (props: ModalPersonProps) => {
    
    return (
        <Fragment>
            <DialogTitle boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}>
                Pick Items
            </DialogTitle>
            <DialogContent>
                <div>
                    <div>
                        
                    </div>
                    <div className="mt-8">
                        <div className="flex items-center">
                            <h4 className="flex-1">
                                nama menu
                            </h4>
                            <h4 className="w-[50px]">
                                x 5
                            </h4>
                            <h4 className="flex-1 text-center">
                                price
                            </h4>
                            <input type="radio" />
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-500 p-1 w-full">
                        <h4 className="text-md font-bold ">
                            Summary
                        </h4>
                        <div className="pt-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Sub Total</h6>
                                <h4>0</h4>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Tax</h6>
                                <h4>0</h4>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Service Charge</h6>
                                <h4>0</h4>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Discounts</h6>
                                <h4>0</h4>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Others</h6>
                                <h4>0</h4>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <h6 className="text-sm font-bold">Total Amount</h6>
                                <h4>0</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <button className="w-full bg-green-500 text-white p-1 rounded-md leading-7">Split</button>
            </DialogActions>
        </Fragment>
    )
}

export default Index