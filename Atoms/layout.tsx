import { atom } from 'recoil';


export const myLayoutState = atom({
    key: 'myLayoutState',
    default: {
        appBar: 'block',
        footer: 'block',
    },
});
export const myAdminAppBarState = atom({
    key: 'myAdminAppBarState',
    default: false


});