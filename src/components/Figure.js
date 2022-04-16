import React from 'react';
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import FieldPoint from "./FieldPoint";

const Figure = observer(({type}) => {
    return (
        <>
            <div className={'figure-wrp'}>
                {Game.currentFigure.coords.map(p => (
                    <FieldPoint
                        key={Math.random()}
                        id={p.y.toString() + p.x.toString()}
                        x={p.x}
                        y={p.y}
                        // color={p.filled ? 'red' : '#4c4c4c'}
                        color={p.filled ? 'red' : 'transparent'}
                        animation
                    />
                ))}
            </div>
        </>
    );
});

export default Figure;
