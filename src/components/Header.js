import React from "react";
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import logo from "../logo.svg";

const Header = observer(({type}) => {
    return (
        <>
            <header className="app-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>Tetris</code>
                    <div>Done figures: {Game.figures.length}</div>
                    <div>Score: {Game.score}</div>
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
