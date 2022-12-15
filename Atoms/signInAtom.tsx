import { atom } from "recoil";

export const formSignInState = atom({
	key: 'formSignInState',
	default: {
		email: '',
		password: '',
	},
});