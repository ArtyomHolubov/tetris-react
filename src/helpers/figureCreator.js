import {figureTypes, startPosition} from "../constants";
import {getRandomFigureType} from "./figureCheck";
import {makeAutoObservable} from "mobx";

class Stick {
    constructor() {
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.type = figureTypes.stick;
        this.coords = [
            {
                x: this.x - 1,
                y: this.y - 1,
                filled: false
            },
            {
                x: this.x,
                y: this.y - 1,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y - 1,
                filled: false
            },
            {
                x: this.x + 2,
                y: this.y - 1,
                filled: false
            },
            {
                x: this.x - 1,
                y: this.y,
                filled: false
            },
            {
                x: this.x,
                y: this.y,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y,
                filled: false
            },
            {
                x: this.x + 2,
                y: this.y,
                filled: false
            },
            {
                x: this.x - 1,
                y: this.y + 1,
                filled: false
            },
            {
                x: this.x,
                y: this.y + 1,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y + 1,
                filled: false
            },
            {
                x: this.x + 2,
                y: this.y + 1,
                filled: false
            },
            {
                x: this.x - 1,
                y: this.y + 2,
                filled: false
            },
            {
                x: this.x,
                y: this.y + 2,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y + 2,
                filled: false
            },
            {
                x: this.x + 2,
                y: this.y + 2,
                filled: false
            }
        ];
        makeAutoObservable(this)
    }
}

class Square {
    constructor() {
        this.x = startPosition.x;
        this.y = startPosition.y;
        this.type = figureTypes.square;
        this.coords = [
            {
                x: this.x,
                y: this.y,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y,
                filled: true
            },
            {
                x: this.x + 1,
                y: this.y + 1,
                filled: true
            },
            {
                x: this.x,
                y: this.y + 1,
                filled: true
            }
        ]
        makeAutoObservable(this)
    }
}

export class FigureCreator {
    static create() {
        switch (getRandomFigureType()) {
            case figureTypes.square:
                return new Square();
                break;
            case figureTypes.stick:
                return new Stick();
                break;
        }
    }
}
