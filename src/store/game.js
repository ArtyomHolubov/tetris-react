import {makeAutoObservable} from "mobx";
import {fieldParams} from "../constants";
import {FigureCreator} from "../helpers/figureCreator";

class Game {
    field = [];
    figures = [];
    score = 0;

    constructor() {
        this.currentFigure = FigureCreator.create();
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

    rotateCurrentFigure() {
        //
    }

    changeCurrentFigure(x, y, type) {
        const xOffset = this.currentFigure.x - x;
        const yOffset = this.currentFigure.y - y;

        this.currentFigure.x = x;
        this.currentFigure.y = y;
        this.currentFigure.coords.forEach(c => {
            c.x -= xOffset;
            c.y -= yOffset;
        });
    }

    addFigure(figure) {
        this.figures.push({...figure});
        const points = this.field.filter(p => figure.coords.some(c => p.x === c.x && c.y === p.y && c.filled));
        points.forEach(p => p.value = true);
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
