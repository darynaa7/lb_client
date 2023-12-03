import {AxiosResponse} from "axios";
import {IUser} from "../model/IUser";
import $api from "../../server";

export default class CalculatorService {
    static calculate(request: any): Promise<AxiosResponse> {
        return $api.post('/worker/calculate', request)
    }
    static cancel(request: any){
        return $api.post('/worker/cancel', request)
    }
}