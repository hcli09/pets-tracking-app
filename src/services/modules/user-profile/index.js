import axios from 'axios';
import qs from 'qs';

export default {
    getUserProfile(data) {
        return axios({
            url: '/user/profile',
            method: 'post',
            data,
        });
    },
};
