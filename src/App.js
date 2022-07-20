import React from "react";
import {observer} from "mobx-react-lite";
import Game from "./store/game";
import Field from "./components/Field";
import SettingsField from "./components/SettingsField";
import Checkbox from "./components/Checkbox";
import InputNumber from "./components/InputNumber";
import ScoreData from "./components/ScoreData";
import './App.css';

function App() {
    const handleToggleAnimation = () => {
        Game.animation = !Game.animation;
    };

    const handleChangePadding = (evt) => {
        Game.padding = parseInt(evt.target.value) || 0;
    }

    return (
        <div className="App">
            <br/>
            <div className={'game-wrp'}>
                <SettingsField>
                    <ScoreData />
                    <Checkbox label={'Animation'} value={Game.animation} onChange={handleToggleAnimation} />
                    <InputNumber label={'Padding'} value={Game.padding} onChange={handleChangePadding} />
                </SettingsField>
                <Field/>
                <SettingsField />
            </div>
        </div>
    );
}

export default observer(App);
