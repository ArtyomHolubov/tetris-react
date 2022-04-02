import React from 'react';
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import {step} from "../constants";

const Figure = observer(({type}) => {
    const {x, y} = Game.currentFigure;

    return (
        <>
            <div className={'figure-wrp'} />
            <style jsx>{`
              .figure-wrp {
                position: absolute;
                left: ${x * step}px;
                top: ${y* step}px;
                height: 50px;
                width: 50px;
                background-color: red;
              }
            `}</style>
        </>
    );
});

export default Figure;
