import React from "react";
import {observer} from "mobx-react-lite";
import Game from "../store/game";
import logo from "../logo.svg";

const ScoreData = observer(() => {
    return (
        <>
            <div className="store-data">
                {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                <code>Tetris</code>
                <p>
                    <br/>
                    <div>Done figures: {Game.figures.length}</div>
                    <div>Score: {Game.score}</div>
                </p>
                <p>{Game.isPause && <div className={'store-data__pause'}>PAUSE...</div>}</p>
            </div>
            <style jsx>{`
              .store-data .store-data__pause {
                color: red;
              }

            `}</style>
        </>
    );
});

export default ScoreData;
