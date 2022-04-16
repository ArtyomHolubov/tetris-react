import React from 'react';
import {step} from "../constants";
import Game from "../store/game";

const FieldPoint = ({x, y, id, color = 'gray', animation}) => (
    <>
        <div className={`field-point-wrp ${Game.animation && animation ? 'roll-out' : ''}`} style={{
            left: `${x * step}px`,
            top: `${y * step}px`,
            backgroundColor: color
        }} />
    </>
);

export default FieldPoint;
