import * as PIXI from 'pixi.js';


interface Score {
    score: number;
    wallet: string;
  }

export const scoreBoard = (first: Score, second: Score, thrid: Score): PIXI.Container => {


    const styleChal = new PIXI.TextStyle({
        fontSize: 12,
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 2,
        fontFamily: 'Press Start 2P',
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowColor: '#000000'
    });


    const boardContainer = new PIXI.Container();
    const startBtn = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
    const startText = new PIXI.Text('Try Again?', styleChal);
    startText.x = 120;
    startText.y = 300;
    
    startBtn.height = 300;
    startBtn.x = 50
    startBtn.width = 200;
    startBtn.y = 150
    boardContainer.addChild(startBtn)
    boardContainer.addChild(startText)
    // containerBtnStart.interactive = true;
    return boardContainer;
}