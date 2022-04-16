import {makeAutoObservable} from "mobx";
import {fieldParams, startPosition, vectors} from "../constants";
import {FigureCreator} from "../helpers/figureCreator";
import {checkFieldIntersection} from "../helpers/figureCheck";

class Game {
    field = [];
    figures = [];
    score = 0;
    animation = true;

    constructor() {
        this.currentFigure = FigureCreator.create(startPosition.x, startPosition.y);
        makeAutoObservable(this);


        for (let y = 0; y < fieldParams.height; y++) {
            for (let x = 0; x < fieldParams.width; x++) {
                const id = y.toString() + x.toString();
                this.field.push({id, x, y, value: false});
            }
        }
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

    async rotateCurrentFigure() {
        const { rotateState, rotateStates, getRotateCoords } = this.currentFigure;
        const resultRotateState = rotateStates - 1 - rotateState ? rotateState + 1 : 0;
        const figureForCheck = { coords: getRotateCoords(resultRotateState) };
        if (checkFieldIntersection(figureForCheck, vectors.UP).isCan) {
            this.currentFigure.rotateState = resultRotateState;
            this.currentFigure.coords = getRotateCoords(resultRotateState);
        }
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
