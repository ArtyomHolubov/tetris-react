import React from "react";
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import logo from "../logo.svg";
import Checkbox from "./Checkbox";

const Header = observer(() => {
    const handleToggleAnimation = () => {
        Game.animation = !Game.animation;
    };
    return (
        <>
            <header className="app-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>Tetris</code>
                    <div>Done figures: {Game.figures.length}</div>
                    <div>Score: {Game.score}</div>
                    <Checkbox label={'Animation'} value={Game.animation} onChange={handleToggleAnimation} />
                </p>
            </header>
            <style jsx>{`
              .app-header {
                display: flex;
                align-items: center;
              }
            `}</style>
        </>
    );
});

export default Header;
