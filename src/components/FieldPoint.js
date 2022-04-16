import React from 'react';
import {step} from "../constants";

const FieldPoint = ({x, y, id, color = 'gray'}) => (
    <>
        <div className={`field-point-wrp`} style={{
            left: `${x * step}px`,
            top: `${y * step}px`,
            backgroundColor: color
        }} />
        <style jsx>{`
          .field-point-wrp {
            position: absolute;
            height: 50px;
            width: 50px;
            transition: all 100ms linear;
          }
        `}</style>
    </>
);

export default FieldPoint;
