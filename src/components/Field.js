import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import FigureComponent from "./Figure";
import FieldPoint from "./FieldPoint";
import Game from "../store/game";
import {colors, step} from "../constants";

const Field = observer(({
                            height = 20,
                            width = 10
                        }) => {
    useEffect(() => {
        Game.run();

        document.addEventListener("keydown", Game.keydown);

        return () => {
            Game.stop();
            document.removeEventListener("keydown", Game.keydown);
        }
    }, []);

    useEffect(() => {

    }, [Game.grayscale]);

    useEffect(() => {
        if (Game.reload) document.location.reload(); // TODO this reload related bug with Game.dropFigure()
    }, [Game.reload]);

    const getFieldPointColor = p => {
        switch (p.value) {
            case 0:
                return 'transparent';
            case 1:
                return p.color;
            case 2:
                return 'white';
            case 3:
                return 'black';
            default:
                break;
        }
    }

    return (
        <>
            <div className={'field-wrp'}>
                <FigureComponent className={'figure'} figure={Game.currentFigure}/>
                {Game.field.map(p => (
                    p.value > 0 &&
                    <FieldPoint key={p.id} id={p.id} x={p.x} y={p.y} color={getFieldPointColor(p)} isStopped={p.value === 1}/>
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
                animation: ${Game.level.speed}ms linear rollout;
              }
            `}</style>
        </>
    );
});

export default Field;
