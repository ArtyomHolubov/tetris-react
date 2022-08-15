import {makeAutoObservable} from "mobx";
import {FigureCreator} from "../helpers/figureCreator";
import {delay} from "../helpers/utils";
import {fieldParams, gameLevels, startPosition, vectors} from "../constants";
import {getRecords} from "../firebase";

class Game {
    field = [];
    figures = [];
    score = 0;
    level = gameLevels[0];
    linesCount = 0;
    animation = false;
    grayscale = false;
    padding = 2;
    isPause = false;
    isGameOver = false;
    isSetScore = false;
    currentFigure = null;
    nextFigure = null;
    interval = 0;
    prevKey = null;
    records = [];

    constructor() {
        this.keydown = this.keydown.bind(this);
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

        (async () => this.records = await getRecords())();
    }

    keydown(e) {
        if (e.key === 'Enter') {
            if (this.isPause) this.run();
            else this.stop();
            if (this.isGameOver) {
                this.isGameOver = false;
                this.reload = true; // TODO this reload related bug with Game.dropFigure()
                this.init();
                this.run();
            } else this.isPause = !this.isPause;
        }

        if (this.isPause) return;

        if (this.prevKey === e.key && e.key === ' ') return;

        switch (e.key) {
            case "ArrowLeft":  // если нажата клавиша влево
                this.moveCurrentFigure(vectors.LEFT);
                break;
            case "ArrowUp":   // если нажата клавиша вверх
                this.moveCurrentFigure(vectors.UP);
                break;
            case "ArrowRight":   // если нажата клавиша вправо
                this.moveCurrentFigure(vectors.RIGHT);
                break;
            case "ArrowDown":
                this.moveCurrentFigure(vectors.DOWN);
                break;
            case " ":
                this.dropFigure();
                break;
            default:
                break;
        }

        this.prevKey = e.key;
    }

    canMove(vector, figure) {
        const {field} = this;
        let points = [];
        let shouldToStop = false;

        switch (vector) {
            case vectors.LEFT:
                points = field.filter(p => figure.coords.some(c => c.filled && p.x === c.x - 1 && c.y === p.y && !p.value));
                break;
            case vectors.RIGHT:
                points = field.filter(p => figure.coords.some(c => c.filled && p.x === c.x + 1 && c.y === p.y && !p.value));
                break;
            case vectors.DOWN:
                points = field.filter(p => figure.coords.some(c => c.filled && p.x === c.x && c.y + 1 === p.y && !p.value));
                if (points.length !== figure.coords.filter(c => c.filled).length)
                    shouldToStop = true;
                break;
            case vectors.UP:
                points = field.filter(p => figure.coords.some(c => c.filled && p.x === c.x && c.y === p.y && !p.value));
                break;
            default:
                break;
        }

        return {isCan: points.length === figure.coords.filter(c => c.filled).length, shouldToStop: shouldToStop};
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
        const {rotateState, rotateStates, getRotateCoords} = this.currentFigure;
        const resultRotateState = rotateStates - 1 - rotateState ? rotateState + 1 : 0;
        const figureForCheck = {coords: getRotateCoords(resultRotateState)};
        if (this.canMove(vectors.UP, figureForCheck).isCan) {
            this.currentFigure.rotateState = resultRotateState;
            this.currentFigure.coords = getRotateCoords(resultRotateState);
        }
    }

    addFigure(figure) {
        this.figures.push({...figure});
        const points = this.field.filter(p => figure.coords.some(c => p.x === c.x && c.y === p.y && c.filled));
        points.forEach(p => {
            p.value = 1;
            p.color = figure.color;
        });
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
    }

    checkStopGame(figure) {
        return figure.coords.some(c => c.y === 0);
    }

    moveCurrentFigure(vector) {
        let isMoveOver = false;

        switch (vector) {
            case vectors.UP:
                this.rotateCurrentFigure();
                break;
            case vectors.LEFT:
                if (this.canMove(vectors.LEFT, this.currentFigure).isCan)
                    this.changeCurrentFigure(this.currentFigure.x - 1, this.currentFigure.y);
                break;
            case vectors.RIGHT:
                if (this.canMove(vectors.RIGHT, this.currentFigure).isCan)
                    this.changeCurrentFigure(this.currentFigure.x + 1, this.currentFigure.y);
                break;
            case vectors.DOWN:
                const can = this.canMove(vectors.DOWN, this.currentFigure);
                if (can.isCan)
                    this.changeCurrentFigure(this.currentFigure.x, this.currentFigure.y + 1);
                else if (can.shouldToStop) {
                    if (this.checkStopGame(this.currentFigure)) {
                        this.stop();
                        this.isGameOver = true;

                        if (this.score)
                            this.isSetScore = true;
                    } else {
                        isMoveOver = true;
                        this.addFigure(this.currentFigure);
                        const rowsForDelete = this.checkFilledRow();
                        this.deleteRows(rowsForDelete);
                        this.updateLevel(rowsForDelete);
                        this.currentFigure = FigureCreator.create(startPosition.x, startPosition.y, this.nextFigure.type);
                        this.createNextFigure();
                    }
                }
                break;
            default:
                break;
        }

        this.prevKey = null;
        return isMoveOver;
    }

    updateLevel(rowsForDelete) {
        this.linesCount += rowsForDelete.length;
        const level = gameLevels[Math.floor(this.linesCount / 8)];
        if (level.id && level.id !== this.level.id) {
            this.stop();
            this.level = level;
            this.run();
        }
    }

    // TODO not using now
    async animationDown() {
        const animationSteps = 500;
        for (let i = 0; i < animationSteps; i++) {
            this.changeCurrentFigure(this.currentFigure.x, this.currentFigure.y + 1 / animationSteps);
            await delay(this.level.speed / animationSteps);
        }
    }

    async dropFigure() {
        if (this.isGameOver) return;

        // fix for bug with drop to next figure
        const figure = this.currentFigure;

        while (!this.moveCurrentFigure(vectors.DOWN) && figure === this.currentFigure) {
            await delay(10);
        }
    }

    async lightingRows(rows) {
        for (let i = 0; i < 2; i++) {
            this.changeRowsValue(rows, 2);
            await delay(100);
            this.changeRowsValue(rows, 3);
            await delay(100);
        }
    }

    changeRowsValue(rows, value) {
        rows.forEach(row => {
            this.field.forEach(f => {
                if (f.y === row)
                    f.value = value;
            })
        });
    }

    async deleteRows(rows) {
        if (!rows.length) return;

        await this.lightingRows(rows);

        this.addedScoresByRows(rows.length);

        rows.forEach(row => this.deleteRow(row));
    }

    addedScoresByRows(rowsCount) {
        switch (rowsCount) {
            case 1:
                this.score += 100;
                break;
            case 2:
                this.score += 300;
                break;
            case 3:
                this.score += 700;
                break;
            case 4:
                this.score += 1500;
                break;
            default:
                break;
        }
    }

    run() {
        this.interval = setInterval(() => this.moveCurrentFigure(vectors.DOWN), this.level.speed)
    }

    stop() {
        clearInterval(this.interval)
    }
}

export default new Game();
