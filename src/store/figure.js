import {makeAutoObservable} from "mobx";

class Figure {
    x = 0;
    y = 0;
    coords = [];

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Figure();
