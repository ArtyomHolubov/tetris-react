import React from 'react';
import {observer} from "mobx-react-lite";
import {layoutParams} from "../constants";

const SettingsField = observer(({children}) => {
    return (
        <>
        <div className={'settings-field-wrp'}>
            {children}
        </div>
            <style jsx>{`
              .settings-field-wrp {
                position: relative;
                height: ${layoutParams.height - 20}px;
                width: ${layoutParams.width / 1.5 - 20}px;
                border: 4px solid #61dafb;
                margin: 0 20px;
                padding: 10px;
              }
            `}</style>
        </>
    );
});

export default SettingsField;
