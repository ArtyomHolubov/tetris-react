import React from 'react';
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import FieldPoint from "./FieldPoint";

const Figure = observer(({className, figure}) => {
    return (
        <>
            <div className={`${className}-wrp`}>
                {figure.coords.map(p => (
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
