import * as PIXI from 'pixi.js';

interface Score {
	score: number;
	wallet: string;
	price: number;
}

export const scoreBoard = (
	w: number,
	h: number,
	livesUsed: number,
	scores: Score[],
	priceScaler: number[],
	highestScore: number,
	challengeScore: number
): PIXI.Container => {

	let price;
	switch (livesUsed) {
		case 0:
			price = priceScaler[0];
			break;
		case 1:
			price = priceScaler[1];
			break;
		case 2:
			price = priceScaler[2];
			break;
		default:
			price = priceScaler[0];
			break;
	}

	const bigFont = new PIXI.TextStyle({
		fontSize: 12,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold',
		dropShadow: true,
		dropShadowColor: '#000000'
	});

	const smallFont = new PIXI.TextStyle({
		fontSize: 8,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold'
		// dropShadow: true,
		// dropShadowColor: '#000000'
	});

	const highestScoreText = new PIXI.Text(`Highest Score ever: ${highestScore}`, smallFont);
	highestScoreText.x = w / 2;
	highestScoreText.anchor.y = 0.5;
	highestScoreText.anchor.x = 0.5;
	highestScoreText.y = h / 3;
	
    const spaceHight = new PIXI.Text(`---------------------`, smallFont);
	spaceHight.x = w / 2;
	spaceHight.anchor.y = 0.5;
	spaceHight.anchor.x = 0.5;
	spaceHight.y = h / 3 + 7.5;
    
	const weekhighestScoreText = new PIXI.Text(`Score to Challenge: ${challengeScore}`, smallFont);
	weekhighestScoreText.x = w / 2;
	weekhighestScoreText.anchor.y = 0.5;
	weekhighestScoreText.anchor.x = 0.5;
	weekhighestScoreText.y = h / 3 + 22;
    
    const spaceHight2 = new PIXI.Text(`---------------------`, smallFont);
	spaceHight2.x = w / 2;
	spaceHight2.anchor.y = 0.5;
	spaceHight2.anchor.x = 0.5;
	spaceHight2.y = h / 3 + 29.5;

	const board = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
	board.height = 300;
	board.x = w / 8 - 8;
	board.width = w / 1.2;
	board.y = 150;

	const useNLTLife = new PIXI.Text('Use my NLT life', smallFont);
	useNLTLife.x = w / 2;
	useNLTLife.anchor.x = 0.5;
	useNLTLife.anchor.y = 0.5;
	useNLTLife.y = h / 2- 30;
	
    const remainingLife = new PIXI.Text('1/2', smallFont);
	remainingLife.x = w / 1.3;
	remainingLife.anchor.x = 0.5;
	remainingLife.anchor.y = 0.5;
	remainingLife.y = h / 2 + 60;

    const tryAgainText = new PIXI.Text('Try Again?', bigFont);
	tryAgainText.x = w / 2;
	tryAgainText.anchor.x = 0.5;
	tryAgainText.anchor.y = 0.5;
	tryAgainText.y = h / 1.35 - 30;

	const yesText = new PIXI.Text('Yes', bigFont);
	yesText.x = w / 2 - 50;
	yesText.anchor.x = 0.5;
	yesText.anchor.y = 0.5;
	yesText.y = h / 1.35;

	const yesPriceText = new PIXI.Text(`${price} $NFTL`, smallFont);
	yesPriceText.x = w / 2 - 50;
	yesPriceText.anchor.x = 0.5;
	yesPriceText.anchor.y = 0.5;
	yesPriceText.y = h / 1.35 + 20;

    const noText = new PIXI.Text('No', bigFont);
	noText.x = w / 2 + 50;
	noText.anchor.x = 0.5;
	noText.anchor.y = 0.5;
	noText.y = h / 1.35;


    const boardContainer = new PIXI.Container();
	boardContainer.addChild(board);
	boardContainer.addChild(highestScoreText);
	boardContainer.addChild(spaceHight);
	boardContainer.addChild(weekhighestScoreText);
	boardContainer.addChild(spaceHight2);
	boardContainer.addChild(useNLTLife);
	boardContainer.addChild(remainingLife);
	boardContainer.addChild(tryAgainText);
	boardContainer.addChild(yesText);
	boardContainer.addChild(yesPriceText);
	boardContainer.addChild(noText);

	return boardContainer;
};
