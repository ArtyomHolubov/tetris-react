import React from "react";
import {observer} from "mobx-react-lite";
import Game from "./store/game";
import Field from "./components/Field";
import SettingsField from "./components/SettingsField";
import Checkbox from "./components/Checkbox";
import InputNumber from "./components/InputNumber";
import ScoreData from "./components/ScoreData";
import FigureComponent from "./components/Figure";
import ModalWindow from "./components/ModalWindow";
import SetScoreForm from "./components/setScoreForm";
import Records from "./components/records";
import './App.css';
import {fieldParams} from "./constants";

function App() {
    const handleToggleAnimation = () => {
        Game.animation = !Game.animation;
    };

    const handleToggleGrayscale = () => {
        Game.grayscale = !Game.grayscale;
    };

    const handleChangePadding = (evt) => {
        Game.padding = parseInt(evt.target.value) || 0;
    }

    return (
        <>
            {Game.isSetScore && <ModalWindow><SetScoreForm /></ModalWindow>}
            <div className="App">
                <br/>
                <div className={'game-wrp'}>
                    <SettingsField>
                        <ScoreData/>
                        {/*<Checkbox label={'animation'} value={Game.animation} onChange={handleToggleAnimation} />*/}
                        <Checkbox label={'grayscale'} value={Game.grayscale} onChange={handleToggleGrayscale}/>
                        <InputNumber label={'Padding'} value={Game.padding} onChange={handleChangePadding}/>
                    </SettingsField>
                    <Field height={fieldParams.height} width={fieldParams.width}/>
                    <SettingsField>
                        <div>Next figure</div>
                        {Game.nextFigure && <FigureComponent className={'next-figure'} figure={Game.nextFigure}/>}
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Records records={Game.records}/>
                    </SettingsField>
                </div>
            </div>
        </>
    );
}

export default observer(App);
