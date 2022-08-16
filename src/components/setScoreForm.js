import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {addRecord, getRecords} from "../firebase";

import Game from "../store/game";

import Records from "./records";
import {colors, padding} from "../constants";

const SetScoreForm = observer(() => {
    const [inputValue, setInputValue] = useState('');

    const handleChangeName = e => {
        setInputValue(e.target.value);
    };

    const handleConfirm = async () => {
        const existRecord = Game.records.find(r => r.name === inputValue);
        const record = {
            name: inputValue,
            score: Game.score,
            date: new Date()
        }

        if (existRecord) record.id = existRecord.id;

        await addRecord(record);

        Game.isSetScore = false;
        Game.records = await getRecords();
    };

    const handleCancel = () => {
        Game.isSetScore = false;
    };

    return (
        <>
            <div className={'set-score-form-wrp'}>
                <div className="set-score-form-wrp__score">
                    <div className="set-score-form-wrp__score__value">Score: {Game.score}</div>
                </div>
                <div className="set-score-form-wrp__input">
                    <input type="text" placeholder={'Enter name...'} max={20} value={inputValue} autoFocus
                           onChange={handleChangeName} />
                </div>
                <Records records={Game.records} isShowDate/>
                <div className="set-score-form-wrp__buttons">
                    <div
                        className={`set-score-form-wrp__buttons--confirm ${!inputValue.length ? 'set-score-form-wrp__buttons--confirm--disabled' : ''}`}
                        onClick={handleConfirm}>Save
                    </div>
                    <div className={"set-score-form-wrp__buttons--cancel"} onClick={handleCancel}>Cancel</div>
                </div>
            </div>
            <style jsx>{`
              .set-score-form-wrp {
                display: flex;
                flex-direction: column;
                height: 500px;
                width: 500px;
                border: 4px solid ${colors.fieldBorderColor};
                background-color: #282c34;
                padding: 20px;
              }

              .set-score-form-wrp__score {
                font-size: 20px;
                margin-bottom: 20px;
                color: white;
              }

              .set-score-form-wrp__input input {
                font-size: 20px;
                width: calc(100% - ${padding * 3}px);
                padding: ${padding * 2}px 0 ${padding * 2}px ${padding * 2}px;
              }

              .set-score-form-wrp__buttons {
                display: flex;
                justify-content: space-between;
                margin: auto 0 0 0;
              }

              .set-score-form-wrp__buttons--confirm,
              .set-score-form-wrp__buttons--cancel {
                font-size: 20px;
                width: 215px;
                border: 4px solid ${colors.fieldBorderColor};
                padding: ${padding * 2}px;
                color: white;
              }

              .set-score-form-wrp__buttons--confirm--disabled {
                pointer-events: none;
                background-color: ${colors.fieldBorderColor};
              }
            `}</style>
        </>
    );
});

export default SetScoreForm;
