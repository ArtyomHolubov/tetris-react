import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction} from "mobx";
import FigureComponent from "./Figure";
import FieldPoint from "./FieldPoint";
import Game from "../store/game";
import {colors, gameSpeed, step} from "../constants";

let renderCount = 1;

const Field = observer(({
                            height = 20,
                            width = 10
                        }) => {
    console.log('render Field', renderCount++);

    useEffect(() => {
        Game.run();

        document.addEventListener("keydown", Game.keydown);

        return () => {
            Game.stop();
            document.removeEventListener("keydown", Game.keydown);
        }
    }, []);

    const getFieldPointColor = p => {
        switch (p.value) {
            case 0:
                return 'transparent';
            case 1:
                return 'gray';
            case 2:
                return 'white';
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
