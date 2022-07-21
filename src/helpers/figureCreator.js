import {figureTypes} from "../constants";
import {getRandomFigureType} from "./figureCheck";
import {makeAutoObservable} from "mobx";

class Stick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = figureTypes.stick;
        this.rotateState = 0;
        this.rotateStates = 2;

        this.getRotateCoords = this.getRotateCoords.bind(this);
        this.coords = this.getRotateCoords(this.rotateState);
        makeAutoObservable(this)
    }

    getRotateCoords(rotateState) {
        switch (rotateState) {
            case 0:
                return [
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
            case 1:
                return [
                    {
                        x: this.x - 1,
                        y: this.y - 1,
                        filled: false
                    },
                    {
                        x: this.x,
                        y: this.y - 1,
                        filled: false
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
                        filled: true
                    },
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
                        x: this.x + 2,
                        y: this.y,
                        filled: true
                    },
                    {
                        x: this.x - 1,
                        y: this.y + 1,
                        filled: false
                    },
                    {
                        x: this.x,
                        y: this.y + 1,
                        filled: false
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
                        filled: false
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
        }
    }
}

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = figureTypes.square;
        this.rotateState = 0;
        this.rotateStates = 1;

        this.getRotateCoords = this.getRotateCoords.bind(this);
        this.coords = this.getRotateCoords(this.rotateState);

        makeAutoObservable(this)
    }

    getRotateCoords() {
        return [
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
        ];
    }
}

export class FigureCreator {
    static create(x, y, type) {
        const typeValue = type || getRandomFigureType();
        switch (typeValue) {
            case figureTypes.square:
                return new Square(x, y);
            case figureTypes.stick:
                return new Stick(x, y);
        }
    }
}
