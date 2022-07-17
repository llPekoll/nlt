import * as PIXI from 'pixi.js';


interface Score {
    score: number;
    wallet: string;
    price: number;
  }

export const scoreBoard = (w:number,h:number, livesUsed:number, scores: [Score], priceScaler:number[]): PIXI.Container => {

    let price
    switch (livesUsed){
        case 0:
            price = priceScaler[0]
            break;
        case 1:
            price = priceScaler[1]
            break;
        case 2:
            price = priceScaler[2]
            break;
    default:
            price = priceScaler[0]
            break;
    }




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
    yesText.x = w/2 -50;
    yesText.anchor.x = .5
    yesText.anchor.y = .5
    yesText.y = h/1.35;

    const noText = new PIXI.Text('No', styleChal);
    noText.x = w/2 +50;
    noText.anchor.x = .5
    noText.anchor.y = .5
    noText.y = h/1.35;

    const yesPriceText = new PIXI.Text(`${price} $NFTL`, styleChal);
    yesPriceText.x = w/2 - 50;
    yesPriceText.anchor.x = .5
    yesPriceText.anchor.y = .5
    yesPriceText.y = h/1.35+20;

    boardContainer.addChild(board)
    boardContainer.addChild(tryAgainText)
    boardContainer.addChild(yesText)
    boardContainer.addChild(noText)
    boardContainer.addChild(yesPriceText)
    
    return boardContainer;
}