import { atom } from 'recoil';

export const myProgressState = atom({
    key: 'myProgressState',
    default:0
});

export const mySkeltonsState = atom({
    key: 'mySkeltonsState',
    default:false
});