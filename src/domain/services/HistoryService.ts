import {AxiosResponse} from "axios/index";
import $api from "../../server";

export default class HistoryService {

    static async GetHistory (request: any): Promise<AxiosResponse> {
        return $api.post('/auth/history', request)

    }


}