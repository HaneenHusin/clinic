import { atom } from 'recoil';

export const myErrorState = atom({
	key: 'myErrorState',
	default: {
		isError: false,
		message: '',
	},
});
