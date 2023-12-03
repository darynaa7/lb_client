import {IUser} from "../model/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../../server";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(username: string, password: string, onError: (error: any) => void) {
        try {
            const response = await AuthService.login(username, password);
            console.log(response)

            if (response.data.error === undefined) {
                localStorage.setItem('token', response.data.token);
                this.setAuth(true);
                this.setUser(response.data.username);
            } else {
                onError(response.data.error)
            }
        } catch (e: any) {
            onError(e)
            console.error("Помилка входу:", e.response?.data?.message || "Невідома помилка");
        }
    }


    async registration(username: string, password: string, onError: (error: any) => void) {
        try {
            if (password === "") {
                onError("Password can't be empty")
                return
            }

            const response = await AuthService.registration(username, password);
            console.log(response)

            if (response.data.error === undefined) {
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
            } else {
                onError(response.data.error)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.loguot();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }


    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/login`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {

            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}