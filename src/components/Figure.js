import React from 'react';
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import FieldPoint from "./FieldPoint";

const Figure = observer(({type}) => {
    return (
        <>
            <div className={'figure-wrp'} >
                {Game.currentFigure.coords.filter(c => c.filled).map(p => (
                    <FieldPoint key={p.y.toString() + p.x.toString()} x={p.x} y={p.y} color={'red'}/>
                ))}
            </div>
            <style jsx>{`
              .figure-wrp {
                
              }
            `}</style>
        </>
    );
});

export default Figure;
