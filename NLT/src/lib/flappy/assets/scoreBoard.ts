import * as PIXI from 'pixi.js';


interface Score {
    score: number;
    wallet: string;
    price: number;
  }

export const scoreBoard = (w:number,h:number, livesUsed:number, scores: [Score]): PIXI.Container => {


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
    const board = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
    board.height = 300;
    board.x = w/8 - 8;
    board.width = w/1.2;
    board.y = 150;
    
    
    
    const tryAgainText = new PIXI.Text('Try Again?', styleChal);
    tryAgainText.x = w/2;
    tryAgainText.anchor.x = .5
    tryAgainText.anchor.y = .5
    tryAgainText.y = h/2+10;

    const yesText = new PIXI.Text('Yes', styleChal);
    yesText.x = w/2;
    yesText.anchor.x = .5
    yesText.anchor.y = .5
    yesText.y = h/2+40;
    const yesPriceText = new PIXI.Text('300$NFTL', styleChal);
    yesPriceText.x = w/2;
    yesPriceText.anchor.x = .5
    yesPriceText.anchor.y = .5
    yesPriceText.y = h/2+60;

    boardContainer.addChild(board)
    boardContainer.addChild(tryAgainText)
    boardContainer.addChild(yesText)
    boardContainer.addChild(yesPriceText)
    
    return boardContainer;
}