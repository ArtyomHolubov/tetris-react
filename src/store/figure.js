import {makeAutoObservable} from "mobx";

class Figure {
    x = 0;
    y = 0;
    coords = [];

    constructor() {
        makeAutoObservable(this)
    }

    changeCoord(x, y) {
        this.x = x;
        this.y = y;
    }

    setType(type) {
        switch (type) {
            case 'dot':
                this.coords.push({ x: this.x, y: this.y })
        }
    }
}

export default new Figure();
