import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import FigureComponent from "./Figure";
import FieldPoint from "./FieldPoint";
import Game from "../store/game";
import {canMove} from "../helpers/figureCheck";
import {startPosition, vectors} from "../constants";
import {FigureCreator} from "../helpers/figureCreator";
import {runInAction} from "mobx";

const Field = observer(({height = 1000, width = 500}) => {
    console.log('render Field');

    useEffect(() => {
        const interval = setInterval(() => changeCurrentFigure(vectors.DOWN), 500);

        document.addEventListener("keydown", move);

        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", move);
        }
    }, []);

    const move = (e) => {
        switch (e.key) {
            case "ArrowLeft":  // если нажата клавиша влево
                changeCurrentFigure(vectors.LEFT);
                break;
            case "ArrowUp":   // если нажата клавиша вверх
                changeCurrentFigure(vectors.UP);
                break;
            case "ArrowRight":   // если нажата клавиша вправо
                changeCurrentFigure(vectors.RIGHT);
                break;
            case "ArrowDown":
                changeCurrentFigure(vectors.DOWN);
                break;
        }
    }

    const changeCurrentFigure = (vector) => {
        switch (vector) {
            case vectors.UP:
                Game.rotateCurrentFigure();
                break;
            case vectors.LEFT:
                if (canMove(vectors.LEFT, Game.currentFigure).isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x - 1, Game.currentFigure.y);
                break;
            case vectors.RIGHT:
                if (canMove(vectors.RIGHT, Game.currentFigure).isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x + 1, Game.currentFigure.y);
                break;
            case vectors.DOWN:
                const can = canMove(vectors.DOWN, Game.currentFigure);
                if (can.isCan)
                    Game.changeCurrentFigure(Game.currentFigure.x, Game.currentFigure.y + 1);
                else if (can.shouldToStop) {
                    Game.addFigure(Game.currentFigure);
                    Game.checkFilledRow();
                    Game.currentFigure = FigureCreator.create(startPosition.x, startPosition.y);
                }
                break;
        }
    }

    return (
        <>
            <div className={'field-wrp'}>
                <FigureComponent/>
                {Game.field.map(p => (
                    <FieldPoint key={p.id} id={p.id} x={p.x} y={p.y} color={p.value ? 'gray' : 'transparent'}/>
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
