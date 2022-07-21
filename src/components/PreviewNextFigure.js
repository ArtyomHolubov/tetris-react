import React from 'react';
import {observer} from "mobx-react-lite";
import FigureComponent from "./Figure";
import Game from "../store/game";
import {colors, step} from "../constants";


const PreviewNextFigure = observer(({
                            height = 20,
                            width = 10
                        }) => {
    console.log('render PreviewNextFigure');

    return (
        <>
            <div className={'next-figure-wrp'}>
                <FigureComponent className={'next-figure'} figure={Game.nextFigure}/>
            </div>
            <style jsx>{`
              .next-figure-wrp {
                position: relative;
                height: ${height * step}px;
                width: ${width * step}px;
                border: 4px solid ${colors.fieldBorderColor};
              }
            `}</style>
        </>
    );
});

export default PreviewNextFigure;
