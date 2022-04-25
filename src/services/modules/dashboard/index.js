import axios from 'axios';
import qs from 'qs';

export default {
    user_dashboard(data) {
        return axios({
            url: '/user/dashboard',
            method: 'post',
            data,
        });
    },

};
