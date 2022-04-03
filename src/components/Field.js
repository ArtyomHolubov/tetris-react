import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import FigureComponent from "./Figure";
import FieldPoint from "./FieldPoint";
import Game from "../store/game";
import {canMove} from "../helpers/figureCheck";
import {figureTypes, startPosition, vectors} from "../constants";

const Field = observer(({height = 1000, width = 500}) => {
    const move = (e) => {
        switch (e.key) {

            case "ArrowLeft":  // если нажата клавиша влево
                if (canMove(vectors.LEFT, Game.currentFigure).isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x - 1, Game.currentFigure.y);
                break;
            case "ArrowTop":   // если нажата клавиша вверх
                // if(top>0)
                //     blueRect.style.marginTop = top - 10 + "px";
                break;
            case "ArrowRight":   // если нажата клавиша вправо
                if (canMove(vectors.RIGHT, Game.currentFigure).isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x + 1, Game.currentFigure.y);
                break;
            case "ArrowDown":   // если нажа
                const can = canMove(vectors.DOWN, Game.currentFigure);
                if (can.isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x, Game.currentFigure.y + 1);
                // else if (can.shouldToStop) {
                //     Game.addFigure(Figure);
                //     Figure.changeCoord(0, 0);
                // }

                break;
        }
    }



    const intervalMove = () => {
        const can = canMove(vectors.DOWN, Game.currentFigure);
        if (can.isCan)
            Game.changeCurrentFigure(Game.currentFigure.x, Game.currentFigure.y + 1, figureTypes.square);
        else if (can.shouldToStop) {
            Game.addFigure(Game.currentFigure);
            Game.changeCurrentFigure(startPosition.x, startPosition.y, figureTypes.square);
            Game.checkFilledRow();
        }
    };

    useEffect(() => {
        const interval = setInterval(intervalMove, 500);

        document.addEventListener("keydown", move);

        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", move);
        }
    }, []);

    return (
        <>
            <div className={'field-wrp'}>
                <FigureComponent/>
                {Game.field.map(p => (
                    <FieldPoint key={p.id} x={p.x} y={p.y} color={p.value ? 'gray' : 'transparent'}/>
                ))}
            </div>
            <style jsx>{`
              .field-wrp {
                position: relative;
                height: ${height}px;
                width: ${width}px;
                border: 4px solid #61dafb;
              }
            `}</style>
        </>
    );
});

export default Field;
