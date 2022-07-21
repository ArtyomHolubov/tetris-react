import Game from "../store/game";
import {figureTypes, vectors} from "../constants";

export class GameManager {
    static keydown (e) {
        if (e.key === 'Enter') {
            if (Game.isPause) Game.run();
            else Game.stop();
            if (Game.isGameOver) {
                Game.isGameOver = false;
                Game.init();
                Game.run();
            } else Game.isPause = !Game.isPause;
        }

        if (Game.isPause) return;

        switch (e.key) {
            case "ArrowLeft":  // если нажата клавиша влево
                Game.moveCurrentFigure(vectors.LEFT);
                break;
            case "ArrowUp":   // если нажата клавиша вверх
                Game.moveCurrentFigure(vectors.UP);
                break;
            case "ArrowRight":   // если нажата клавиша вправо
                Game.moveCurrentFigure(vectors.RIGHT);
                break;
            case "ArrowDown":
                Game.moveCurrentFigure(vectors.DOWN);
                break;
            case " ":
                Game.dropFigure();
                break;
        }
    }

    static checkFieldIntersection (figure, vector) {
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

    static canMove (moveType, figure) {
        return this.checkFieldIntersection(figure, moveType)
    }

    static getRandomFigureType () {
        const types = Object.values(figureTypes);
        const index = Math.floor(Math.random() * types.length);
        return types[index];
    }
}
