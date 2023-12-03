import React, {FC, useContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./presenter/forms/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import CalculateForm from "./presenter/forms/CalculateForm";


  const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
      if (localStorage.getItem('token')) {
        store.checkAuth()
      }
    }, [])


      if (!store.isAuth) {
          return (
              <div>
                  <LoginForm/>
              </div>
          );
      }


  return (
          <div className="container">

              <h1>{store.isAuth ? ` ${store.user}` : ''}</h1>
              <h1>welcome to the load balancer</h1>
              <h3>input number to calculate the factorial</h3>
              <div>
                  <CalculateForm/>
              </div>
          </div>
  );
}

export default observer(App);
