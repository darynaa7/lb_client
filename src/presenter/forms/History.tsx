import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import {CalculatorField} from "../components/CalculatorField"
import io from "socket.io-client"


const History: FC = () => {

    const history = async () => {
        try {
            // await store.login(username, password, (error) => {
            //     setLoginErrorMessage(error)
            //     setRegistrationErrorMessage(null)
            // });
        } catch (error: any) { }
    };



    return (
        <div>
            <div>

            </div>
        </div>
    );
};

export default observer(History);