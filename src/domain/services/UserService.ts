import $api from "../../server";
import {AxiosResponse} from 'axios';
import {IUser} from "../model/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}