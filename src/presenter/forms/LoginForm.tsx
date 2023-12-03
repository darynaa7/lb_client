import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const { store } = useContext(Context);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            await store.login(username, password, (error) => {
                setLoginErrorMessage(error)
                setRegistrationErrorMessage(null)
            });
        } catch (error: any) { }
    };

    const handleRegistration = async () => {
        try {
            await store.registration(username, password, (error) => {
                setRegistrationErrorMessage(error)
                setLoginErrorMessage(null)
            });
        } catch (error: any) { }
    };

    return (
        <div>
            <h2>Registration</h2>
            <div>
                <input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder='username'
                />
            </div>
            <div>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='password'
                />
            </div>
            <div style={{display: "flex"}}>
                <button onClick={handleLogin}>
                    Login
                </button>
                <div className="error-text">
                    { loginErrorMessage == null ? "" : loginErrorMessage?.toString() }
                </div>
            </div>

            <div style={{display: "flex"}}>
                <button onClick={handleRegistration}>
                    Registration
                </button>
                <div className="error-text">
                    { registrationErrorMessage == null ? "" : registrationErrorMessage?.toString() }
                </div>
            </div>
        </div>

    );
};

export default observer(LoginForm);