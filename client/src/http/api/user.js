import serviceAxios from "../index.js";

export const login = (data) => {
    return serviceAxios({
        url: "user/login",
        method: "post",
        data,
    });
};

export const register = (data) => {
    return serviceAxios({
        url: "user/register",
        method: "post",
        data,
    });
};

export const v_email = (data) => {
    return serviceAxios({
        url: "user/verify_email",
        method: "post",
        data,
    });
};

export const f_pwd = (data) => {
    return serviceAxios({
        url: "user/modify_pwd",
        method: "post",
        data,
    });
};