import axios from 'axios';
import qs from 'qs';

export default {
    editUserProfile(data) {
        return axios({
            url: '/user/profile/update',
            method: 'post',
            data,
        });
    },
    getLocationList() {
        return axios({
            url: '/data/location_list',
            method: 'post',            
        });        
    }
};