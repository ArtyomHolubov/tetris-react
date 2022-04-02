import {makeAutoObservable} from "mobx";
import {fieldParams} from "../constants";

class Game {
    field = [];
    figures = [];
    score = 0;
    currentFigure = {
        x: 0,
        y: 0,
        coords: []
    };

    constructor() {
        makeAutoObservable(this);

        for (let y = 0; y < fieldParams.height; y++) {
            for (let x = 0; x < fieldParams.width; x++) {
                const id = y.toString() + x.toString();
                // eslint-disable-next-line no-console
                // console.log('id', id);
                this.field.push({id, x, y, value: false});
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

    checkFilledRow() {
        let filledRowIndex = -1;

        for (let i = 0; i < fieldParams.height; i++) {
            if (this.field.filter(p => p.y === i && p.value).length === fieldParams.width) {
                filledRowIndex = i;
                this.deleteRow(filledRowIndex);
            }
        }
    }

    deleteRow(index) {
        const previousField = this.field.map(p => ({...p}));

        this.field.forEach(p => {
            if (p.y === 0) p.value = false
            else if (p.y <= index) {
                const upperPoint = previousField.find(up => up.y === p.y - 1 && up.x === p.x);
                p.value = upperPoint.value;
            }
        });

        this.score += 100;
    }
}

export default new Game();
