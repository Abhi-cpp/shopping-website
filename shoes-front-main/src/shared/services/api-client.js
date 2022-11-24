import axios from 'axios';
export const API_CLIENT = {
    get(URL,data){
        const promise = axios.get(URL,data);
        return promise;
    },
    post(URL, data){
        const promise = axios.post(URL, data);
        return promise;
    }

}