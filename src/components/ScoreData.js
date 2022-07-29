import React from "react";
import {observer} from "mobx-react-lite";
import Game from "../store/game";

const ScoreData = observer(() => {
    return (
        <>
            <div className="store-data">
                <code>Tetris</code>
                {Game.isGameOver && <>
                    <p className={'store-data__game-over'}>GAME OVER</p>
                    <span style={{fontSize: '14px'}}>Please push ENTER to start new game</span>
                </>}
                <p>
                    <div>Done figures: {Game.figures.length}</div>
                    <div>Score: {Game.score}</div>
                    <div>Level: {Game.level?.id?.toString()}</div>
                    <div>Lines: {Game.linesCount}</div>
                </p>
                <p>{!Game.isPause && <div className={'store-data__pause--inactive'}>Press ENTER to Pause the game</div>}</p>
                <p>{Game.isPause && <div className={'store-data__pause--active'}>PAUSE...</div>}</p>
            </div>
            <style jsx>{`
              .store-data .store-data__pause--active {
                color: red;
              }
              
              .store-data .store-data__pause--inactive {
                color: gray;
              }
              
              .store-data .store-data__game-over {
                color: red;
              }

            `}</style>
        </>
    );
});

export default ScoreData;
