import React, {useState} from "react";
import Calculator from "../../domain/calculator/Calculator";
//const login = require("../../domain/store/Store")

export const CalculatorField = (props) => {

    const [value, setValue] = useState("")
    let [cancelFlag, setCancelFlag] = useState(false);

    const cancel = async() => {
        try{
            setCancelFlag = true;
            //await Calculator.Canceletion(cancelFlag, props.cancelFieldId);
        } catch (e) {
            console.log("Error canceling: " + e)
        }
    };

    const calculate = async () => {
        try {
            await Calculator.requestCalculation(value, props.fieldId);
        } catch (e) {
           console.log("Error calculating: " + e)
        }
    }

    return (
        <div>
            <div>
                <input
                    value={value}
                    type="text"
                    placeholder='number'
                    onChange={(value) => setValue(value.currentTarget.value)}
                />
            </div>
            <div>
                <button onClick={calculate}>
                    Calculate
                </button>
                <button onClick={cancel}>
                    Cancel
                </button>
            </div>
            <text>process: {props.progress}</text>
            <br/>
            <text>result: {props.result}</text>
        </div>
    )
}