import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import FigureComponent from "./Figure";
import FieldPoint from "./FieldPoint";
import Game from "../store/game";
import {canMove} from "../helpers/figureCheck";
import {colors, gameSpeed, startPosition, step, vectors} from "../constants";
import {FigureCreator} from "../helpers/figureCreator";
import {delay} from "../helpers/utils";

let theInterval = 0;

const Field = observer(({
                            height = 20,
                            width = 10
                        }) => {
    console.log('render Field');

    useEffect(() => {
        runGame();

        document.addEventListener("keydown", keydown);

        return () => {
            stopGame();
            document.removeEventListener("keydown", keydown);
        }
    }, []);

    const runGame = () => theInterval = setInterval(() => changeCurrentFigure(vectors.DOWN), gameSpeed)
    const stopGame = () => clearInterval(theInterval)

    const deleteRows = async rows => {
        if (!rows.length) return;
        stopGame();

        await lightingRows(rows);

        rows.forEach(row => Game.deleteRow(row));
        if (!Game.isPause) runGame();
    };

    const changeRowsValue = (rows, value) => {
        rows.forEach(row => {
            Game.field.forEach(f => {
                if (f.y === row)
                    f.value = value;
            })
        });
    };

    const lightingRows = async rows => {
        for (let i = 0; i < 2; i++) {
            changeRowsValue(rows, 2);

            await delay(100);

            changeRowsValue(rows, 1);

            await delay(100);
        }
    }

    const keydown = (e) => {
        if (e.key === 'Enter') {
            if (Game.isPause) runGame();
            else stopGame();
            if (Game.isGameOver) {
                Game.isGameOver = false;
                Game.init();
                runGame();
            } else Game.isPause = !Game.isPause;
        }

        if (Game.isPause) return;

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
            case " ":
                dropFigure();
                break;
        }
    }

    const dropFigure = async () => {
        while (!changeCurrentFigure(vectors.DOWN)) {
            // await delay(10); //TODO there is a bug
        }
    }

    const changeCurrentFigure = (vector) => {
        let isMoveOver = false;
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
                    if (Game.checkStopGame(Game.currentFigure)) {
                        stopGame();
                        Game.isGameOver = true;
                    } else {
                        isMoveOver = true;
                        Game.addFigure(Game.currentFigure);
                        const rowsForDelete = Game.checkFilledRow();
                        deleteRows(rowsForDelete);
                        Game.currentFigure = FigureCreator.create(startPosition.x, startPosition.y, Game.nextFigure.type);
                        Game.createNextFigure();
                    }
                }
                break;
        }

        return isMoveOver;
    }

    const getFieldPointColor = p => {
        switch (p.value) {
            case 0:
                return 'transparent';
            case 1:
                return 'gray';
            case 2:
                return 'white';
        }
    }

    return (
        <>
            <div className={'field-wrp'}>
                <FigureComponent className={'figure'} figure={Game.currentFigure}/>
                {Game.field.map(p => (
                    p.value > 0 &&
                    <FieldPoint key={p.id} id={p.id} x={p.x} y={p.y} color={getFieldPointColor(p)}/>
                ))}
            </div>
            <style jsx>{`
              .field-wrp {
                position: relative;
                height: ${height * step}px;
                width: ${width * step}px;
                border: 4px solid ${colors.fieldBorderColor};
              }

              .field-point-wrp {
                position: absolute;
                height: ${step - Game.padding * 2}px;
                width: ${step - Game.padding * 2}px;
                transition: all 100ms linear;
              }

              .field-point {
                height: 100%;
                width: 100%;
              }

              @keyframes rollout {
                0% {
                  transform: translateY(-50px);
                }
                100% {
                  transform: translateY(0);
                }
              }

              .roll-out {
                animation: ${gameSpeed}ms linear rollout;
              }
            `}</style>
        </>
    );
});

export default Field;
