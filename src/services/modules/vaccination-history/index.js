import axios from 'axios';
import qs from 'qs';

export default {
    getAllVaccination(data) {
        return axios({
            url: '/user/record/all/type',
            method: 'post',
            data,
        });
    },
    addVaccination(data) {
        return axios({
            url: '/user/record/add',
            method: 'post',   
            data,         
        });        
    },
    editVaccination(data) {
        return axios({
            url: '/user/record/edit',
            method: 'post',   
            data,         
        });        
    },
    deleteVaccination(data) {
        return axios({
            url: '/user/record/delete',
            method: 'delete',   
            data,         
        });        
    },
    getPetList(data) {
        return axios({
            url: '/user/pet/all',
            method: 'post',   
            data,         
        });            
    }
};