import React from "react";
import {observer} from "mobx-react-lite";
import FigureStore from "../store/figure";
import Game from "../store/game";
import logo from "../logo.svg";

const Header = observer(({type}) => {
    const {x, y} = FigureStore;

    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <code>Tetris</code>
                    <div>Done figures: {Game.figures.length}</div>
                    <div>Score: {Game.score}</div>
                </p>
            </header>
            <style jsx>{`
              .figure-wrp {
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                height: 50px;
                width: 50px;
                background-color: red;
              }
            `}</style>
        </>
    );
});

export default Header;
