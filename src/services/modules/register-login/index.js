import axios from 'axios';
import qs from 'qs';

export default {
    login(data) {
        return axios({
            url: '/login',
            method: 'post',
            data: qs.stringify(data),
        });
    },

    register(data) {
        return axios({
            url: '/register',
            method: 'post',
            data,
        });
    },
};
