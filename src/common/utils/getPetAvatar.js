import { FireBaseStorage as storage } from '@services/firebase.js';

import { ref, getDownloadURL } from 'firebase/storage';

export const getPetAbListWithFullAvatar = petAbList => {
	Promise.all(
		petAbList.map(pet => getDownloadURL(ref(storage, pet.petAvatar)))
	).then(urls => {
		for (let i = 0; i < urls.length; i++) {
			petAbList[i].petAvatar = urls[i];
		}
	});
	return petAbList;
};
