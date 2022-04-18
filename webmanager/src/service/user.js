import { http } from "../utils/http";

export const login = (values) => {
    return http("scweb/login/token", { data: values, method: 'GET' });
}