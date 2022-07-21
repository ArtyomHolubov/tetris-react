import {makeAutoObservable} from "mobx";
import {fieldParams, startPosition, vectors} from "../constants";
import {FigureCreator} from "../helpers/figureCreator";
import {checkFieldIntersection} from "../helpers/figureCheck";

class Game {
    field = [];
    figures = [];
    score = 0;
    animation = false;
    padding = 4;
    isPause = false;
    isGameOver = false;
    currentFigure = null;
    nextFigure = null;

    constructor() {
        this.init();
        makeAutoObservable(this);
    }

    init() {
        this.field = [];
        this.figures = [];
        this.score = 0;

        this.createNextFigure();
        this.currentFigure = FigureCreator.create(startPosition.x, startPosition.y);

        for (let y = 0; y < fieldParams.height; y++) {
            for (let x = 0; x < fieldParams.width; x++) {
                const id = y.toString() + x.toString();
                this.field.push({id, x, y, value: 0});
            }
        }
    }

    createNextFigure() {
        this.nextFigure = FigureCreator.create(1, 2);
    }

    changeCurrentFigure(x, y) {
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
        points.forEach(p => p.value = 1);
    }

    checkFilledRow() {
        const rowsForDelete = [];

        for (let i = 0; i < fieldParams.height; i++) {
            if (this.field.filter(p => p.y === i && p.value).length === fieldParams.width) {
                rowsForDelete.push(i)
            }
        }

        return rowsForDelete;
    }

    deleteRow(index) {
        const previousField = this.field.map(p => ({...p}));

        this.field.forEach(p => {
            if (p.y === 0) p.value = 0
            else if (p.y <= index) {
                const upperPoint = previousField.find(up => up.y === p.y - 1 && up.x === p.x);
                p.value = upperPoint.value;
            }
        });

        this.score += 100;
    }

    checkStopGame(figure) {
        return figure.coords.some(c => c.y === 0);
    }
}

export default new Game();
