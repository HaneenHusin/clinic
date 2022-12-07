import datas from './Photos';
export class PhotoService {
    getImages() {
        let results1:any[] = [];
        datas.map((datas) => {
            results1.push(datas)
        });
        return results1;
    }
}