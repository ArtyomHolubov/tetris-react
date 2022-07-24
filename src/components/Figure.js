import React from 'react';
import {observer} from "mobx-react-lite";
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
                        color={p.filled ? figure.color : 'transparent'}
                        animation
                    />
                ))}
            </div>
        </>
    );
});

export default Figure;
