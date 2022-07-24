import React from 'react';
import {step} from "../constants";
import Game from "../store/game";

const FieldPoint = ({x, y, id, color = 'gray', animation, isStopped}) => (
    <div className={`field-point-wrp ${Game.animation && animation ? 'roll-out' : ''}`} style={{
            left: `${x * step + Game.padding}px`,
            top: `${y * step + Game.padding}px`,
            backgroundColor: isStopped ? 'gray' : 'transparent'
        }}>
        <div className={`field-point`} style={{
            backgroundColor: color,
            filter: `opacity(${isStopped ? Game.grayscale ? '40' : '0' : '100'}%)`
        }} />
    </div>
);

export default FieldPoint;
