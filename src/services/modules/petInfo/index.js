import axios from 'axios';

export default {
    addPet(data) {
        return axios({
            url: '/user/pet/add',
            method: 'post',
            data,
        });
    },

    getPet(data) {
        return axios({
            url: '/user/pet/profile',
            method: 'post',
            data,
        });
    },

    updatePet(data) {
        return axios({
            url: '/user/pet/profile/update',
            method: 'post',
            data,
        });
    },

    deletePet(data) {
        return axios({
            url: '/user/pet/delete',
            method: 'delete',
            data,
        });
    },
    getSpecies(data) {
        return axios({
            url: '/data/species_list',
            method: 'post',
            data,
        });
    },
    getBreed(data) {
        return axios({
            url: '/data/breed_list',
            method: 'post',
            data,
        });
    },
};


