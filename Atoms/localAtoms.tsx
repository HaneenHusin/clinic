import {atom} from 'recoil';

export const myLocalState = atom({
    key: 'myLocalState',
    default: "ar"


});
export const myAbbBarLocalState = atom({
        key: 'myAbbBarLocalState',
        default: "AR"

    }
);
export const myDirectionState = atom({
    key: 'myDirectionState',
    default: "rtl"
});