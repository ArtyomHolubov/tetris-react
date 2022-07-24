import {makeAutoObservable} from "mobx";
import {figureTypes} from "../constants";

class Figure {
    matrix = [];
    center = {
        x: 1,
        y: 1
    }
    type = null;
    rotateState = 0;
    rotateStates = 1;

    constructor({type, matrix, x, y, rotateStates}) {
        this.type = type;
        this.matrix = matrix;
        this.x = x;
        this.y = y;
        this.rotateStates = rotateStates;

        this.getRotateCoords = this.getRotateCoords.bind(this);
        this.coords = this.getRotateCoords(this.rotateState);
        makeAutoObservable(this)
    }

    getRotateCoords(rotateState) {
        const rotateStatesCoords = [];
        const { x, y, center, matrix } = this;
        let resultMatrix = matrix;

        const rotates = new Array(rotateState);
        for (let i = rotates.length - 1; i >= 0; i--) {
            resultMatrix = rotateMatrixRight90(resultMatrix);
        }

        for (let i = resultMatrix.length - 1; i >= 0; i--) {
            for (let j = 0; j < resultMatrix[i].length; j++) {
                rotateStatesCoords.push({
                    x: x - center.x + j,
                    y: y - center.y + i,
                    filled: !!resultMatrix[i][j]
                })
            }
        }

        return rotateStatesCoords;
    }
}

export class FigureCreator {
    static create(x, y, type) {
        const typeValue = type || this.getRandomFigureType();
        // const typeValue = figureTypes.rightL;
        switch (typeValue) {
            case figureTypes.square:
                return new Figure({
                    type: figureTypes.square,
                    matrix: [
                        [1, 1],
                        [1, 1]
                    ],
                    x,
                    y,
                    rotateStates: 1
                });
            case figureTypes.stick:
                return new Figure({
                    type: figureTypes.stick,
                    matrix: [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    x,
                    y,
                    rotateStates: 2
                });
            case figureTypes.tsign:
                return new Figure({
                    type: figureTypes.tsign,
                    matrix: [
                        [0, 0, 0],
                        [0, 1, 0],
                        [1, 1, 1]
                    ],
                    x,
                    y,
                    rotateStates: 4
                });
            case figureTypes.rightL:
                return new Figure({
                    type: figureTypes.rightL,
                    matrix: [
                        [0, 1, 0],
                        [0, 1, 0],
                        [0, 1, 1]
                    ],
                    x,
                    y,
                    rotateStates: 4
                });
            case figureTypes.leftL:
                return new Figure({
                    type: figureTypes.leftL,
                    matrix: [
                        [0, 1, 0],
                        [0, 1, 0],
                        [1, 1, 0]
                    ],
                    x,
                    y,
                    rotateStates: 4
                });
            case figureTypes.rightS:
                return new Figure({
                    type: figureTypes.rightS,
                    matrix: [
                        [0, 1, 0],
                        [0, 1, 1],
                        [0, 0, 1]
                    ],
                    x,
                    y,
                    rotateStates: 2
                });
            case figureTypes.leftS:
                return new Figure({
                    type: figureTypes.leftS,
                    matrix: [
                        [0, 0, 1],
                        [0, 1, 1],
                        [0, 1, 0]
                    ],
                    x,
                    y,
                    rotateStates: 2
                });
            default:
                break;
        }
    }

    static getRandomFigureType () {
        const types = Object.values(figureTypes);
        const index = Math.floor(Math.random() * types.length);
        return types[index];
    }
}

function rotateMatrixRight90(matrix) {
    let result = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(matrix[i][j]);
        }
    }
    return result;
}
