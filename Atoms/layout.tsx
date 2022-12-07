import { atom } from 'recoil';


export const myLayoutState = atom({
    key: 'myLayoutState',
    default: {
        appBar: 'block',
        footer: 'block',
    },
});