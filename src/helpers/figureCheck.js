import {figureTypes, vectors} from "../constants";
import Game from "../store/game";

export const checkFieldIntersection = (figure, vector) => {
    const {field} = Game;
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
    }

    return {isCan: points.length === figure.coords.filter(c => c.filled).length, shouldToStop: shouldToStop};
}

export const canMove = (moveType, figure) => {
    return checkFieldIntersection(figure, moveType)
}

export const getRandomFigureType = () => {
    const types = Object.values(figureTypes);
    const index = Math.floor(Math.random() * types.length);
    return types[index];
}
