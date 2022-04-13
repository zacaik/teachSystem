import { http } from "../utils/http";

export const login = (values) => {
    return http("login", { data: values, method: 'GET' });
}