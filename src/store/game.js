import {makeAutoObservable} from "mobx";

class Game {
    field = [];
    figures = [];
    currentFigure = {
        x: 0,
        y: 0,
        coords: []
    };

    constructor() {
        makeAutoObservable(this);

        for (let i = 0; i < 20; i++) {
            for (let k = 0; k < 10; k++) {
                this.field.push({ id: i.toString() +  k.toString(), x: k, y: i, value: false});
            }
        }
    }

    changeCurrentFigure(x, y) {
        this.currentFigure.x = x;
        this.currentFigure.y = y;
    }

    addFigure(figure) {
        this.figures.push({...figure});
        const point = this.field.find(p => p.x === figure.x && p.y === figure.y);
        point.value = true;
    }
}

export default new Game();
