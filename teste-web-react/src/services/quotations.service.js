import http from "../http-common";

class QuotationsDataService {
    consult(data) {
        return http.post(`/quotations/`, data)
    } 
}

export default new QuotationsDataService();