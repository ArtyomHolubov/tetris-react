import {vectors} from "../constants";
import Game from "../store/game";

const checkFieldIntersection = (figure, vector) => {
    const {field} = Game;
    let point;
    let shouldToStop = false;

    const {x, y} = figure;

    switch (vector) {
        case vectors.LEFT:
            point = field.find(p => p.x === x - 1 && p.y === y && !p.value);
            break;
        case vectors.RIGHT:
            point = field.find(p => p.x === x + 1 && p.y === y && !p.value);
            break;
        case vectors.DOWN:
            point = field.find(p => p.x === x && p.y === y + 1 && !p.value);
            if (!point)
                shouldToStop = true;
            break;
    }

    return {isCan: !!point, shouldToStop: shouldToStop};
}

export const canMove = (moveType, figure) => {
    return checkFieldIntersection(figure, moveType)
}
