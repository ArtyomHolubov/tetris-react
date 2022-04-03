import {makeAutoObservable} from "mobx";
import {fieldParams, figureTypes, startPosition} from "../constants";

class Game {
    field = [];
    figures = [];
    score = 0;
    currentFigure = {
        x: startPosition.x,
        y: startPosition.y,
        type: figureTypes.square,
        coords: [
            {
                x: startPosition.x,
                y: startPosition.y
            },
            {
                x: startPosition.x + 1,
                y: startPosition.y
            },
            {
                x: startPosition.x + 1,
                y: startPosition.y + 1
            },
            {
                x: startPosition.x,
                y: startPosition.y + 1
            }
        ]
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

    changeCurrentFigure(x, y, type) {
        this.currentFigure.x = x;
        this.currentFigure.y = y;

        if (type) this.currentFigure.type = type;

        switch (this.currentFigure.type) {
            case figureTypes.square:
                this.currentFigure.coords = [
                    {
                        x: x,
                        y: y
                    },
                    {
                        x: x + 1,
                        y: y
                    },
                    {
                        x: x + 1,
                        y: y + 1
                    },
                    {
                        x: x,
                        y: y + 1
                    }
                ]
        }
    }

    addFigure(figure) {
        this.figures.push({...figure});
        const points = this.field.filter(p => figure.coords.some(c => p.x === c.x && c.y === p.y));
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
