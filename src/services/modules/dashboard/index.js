import axios from 'axios';

export default {
    user_dashboard(data) {
        return axios({
            url: '/user/dashboard',
            method: 'post',
            data,
        });
    },

};
