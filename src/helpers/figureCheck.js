import {vectors} from "../constants";
import Game from "../store/game";

const checkFieldIntersection = (figure, vector) => {
    const {field} = Game;
    let points = [];
    let shouldToStop = false;

    switch (vector) {
        case vectors.LEFT:
            points = field.filter(p => figure.coords.some(c => p.x === c.x - 1 && c.y === p.y && !p.value));
            break;
        case vectors.RIGHT:
            points = field.filter(p => figure.coords.some(c => p.x === c.x + 1 && c.y === p.y && !p.value));
            break;
        case vectors.DOWN:
            points = field.filter(p => figure.coords.some(c => p.x === c.x && c.y + 1 === p.y && !p.value));
            if (points.length !== figure.coords.length)
                shouldToStop = true;
            break;
    }

    return {isCan: points.length === figure.coords.length, shouldToStop: shouldToStop};
}

export const canMove = (moveType, figure) => {
    return checkFieldIntersection(figure, moveType)
}
