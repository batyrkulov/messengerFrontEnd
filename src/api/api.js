import * as axios from 'axios';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api/',
    headers:     {
        "API-KEY": '988c14fa-006f-440c-a07b-8e01bdfdbc87'
    }
});

export const authAPI =  {
    auth: async (email, password) => {
        let response = await instance.post(`auth`, {email, password});
        return response.data.errorCode === 0;
    },

    isAuth: ()=> {
        return instance.get(`me`)
            .then(response => {
                return response.data.errorCode===0 ? response.data.data : false;
            });
    },

    logout: async ()=> {
        let response = await instance.delete(`auth`);
        return response.data.errorCode === 0;
    }
}

export const usersAPI = {
    isEmailFree: async email => {
        let response = await instance.get(`isFree/email/${email}`);
        return  response.data.errorCode===0;
    },

    createUser: async data => {
        let response = await instance.post(`me`, data);
        return response.data.errorCode === 0;
    },

    getUsers: async (page=1, pageSize = 30) => {
        let response = await instance.get(`users/${page}/${pageSize}`);
        return response.data;
    },

    getUser: async userId => {
        let response = await instance.get(`user/${userId}`);
        return response.data;
    },

    updateUser: async (surname, status) => {
        let response = await instance.put(`me/${surname}/${status}`);
        return response.data.errorCode===0;
    }

}

export const securityAPI =  {
    getCaptchaUrl: ()=> {
        return instance.get(`security/get-captcha-url`)
            .then(response=>response.data.url);
    }

}

export const messagesAPI =  {
    sendMessage: async (to, body)=> {
        let response = await instance.post(`message`, {to, body});
        return  response.data;
    },

    getMessages: async (userId, page=1, pageSize=20) => {
        const response = await instance.get(`messages/${userId}/${page}/${pageSize}`);
        return response.data;
    }
}

export const contactsAPI = {
    getContacts: async (page=1, pageSize=30) => {
        const response = await instance.get(`contacts/${page}/${pageSize}`);
        return response.data;
    }
}