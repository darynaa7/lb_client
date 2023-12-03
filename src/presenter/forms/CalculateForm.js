import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {CalculatorField} from "../components/CalculatorField"
import io from "socket.io-client"
const history = require("./HistoryForm")

const sleep = ms => new Promise(r => setTimeout(r, ms))

const CalculateForm = () => {

    const [progresses, setProgresses] = useState([0.0, 0.0, 0.0, 0.0])
    const [results, setResults] = useState([0, 0, 0, 0])

    const socket = io("http://localhost:5000")
    socket.on("connect_error", (e) => {
        console.log("Socket error: " + e)
    })

    socket.on("worker_response", (data) => {
        console.log(data)
    })

    socket.on("balancer_response", async (data) => {
        console.log(data)

        progresses.splice(data.fieldId, 1)
        progresses.splice(data.fieldId, 0, data.progress * 100.0)
        setProgresses([...progresses])

        if (data.result !== 0) {
            results.splice(data.fieldId, 1)
            results.splice(data.fieldId, 0, data.result)
            setResults([...results])
        }
    })

    return (
        <div>
            <div>
                <button className="view-history-button" onClick={history}>
                     View history
                </button>
            </div>
             <div>
                 <CalculatorField fieldId={0} cancelFieldId={0} progress={progresses[0]} result={results[0]}/>
                 <CalculatorField fieldId={1} cancelFieldId={1} progress={progresses[1]} result={results[1]}/>
                 <CalculatorField fieldId={2} cancelFieldId={2} progress={progresses[2]} result={results[2]}/>
                 <CalculatorField fieldId={3} cancelFieldId={3} progress={progresses[3]} result={results[3]}/>
             </div>
        </div>
    );
};

export default observer(CalculateForm);