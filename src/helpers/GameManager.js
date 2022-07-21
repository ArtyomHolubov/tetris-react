import Game from "../store/game";
import {vectors} from "../constants";

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
}
