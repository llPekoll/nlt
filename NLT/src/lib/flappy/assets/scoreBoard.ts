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
	const xs = new PIXI.TextStyle({
		fontSize: 6,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold'
		// dropShadow: true,
		// dropShadowColor: '#000000'
	});
	const toTop = 120;
	const toBot = 420;
	const highestScoreText = new PIXI.Text(`Highest Score ever: ${highestScore}`, smallFont);
	highestScoreText.x = w / 2;
	highestScoreText.anchor.y = 0.5;
	highestScoreText.anchor.x = 0.5;
	highestScoreText.y = toTop;

	const spaceHight = new PIXI.Text(`---------------------`, smallFont);
	spaceHight.x = w / 2;
	spaceHight.anchor.y = 0.5;
	spaceHight.anchor.x = 0.5;
	spaceHight.y = toTop + 7.5;

	const weekhighestScoreText = new PIXI.Text(`Score to Challenge: ${challengeScore}`, smallFont);
	weekhighestScoreText.x = w / 2;
	weekhighestScoreText.anchor.y = 0.5;
	weekhighestScoreText.anchor.x = 0.5;
	weekhighestScoreText.y = toTop + 22;

	const spaceHight2 = new PIXI.Text(`---------------------`, smallFont);
	spaceHight2.x = w / 2;
	spaceHight2.anchor.y = 0.5;
	spaceHight2.anchor.x = 0.5;
	spaceHight2.y = toTop + 29.5;

	const textureBtn = PIXI.Texture.from('/flappy/btn.png');
	const board = new PIXI.NineSlicePlane(textureBtn, 4, 4, 4, 6);
	board.height = 365;
	board.x = w / 8 - 8;
	board.width = w / 1.2;
	board.y = 100;

	const boardYes = new PIXI.NineSlicePlane(textureBtn, 4, 4, 4, 6);
	boardYes.width = 100;
	boardYes.height = 40;
	boardYes.x = 40;
	boardYes.y = toBot - 20;

	const boardNo = new PIXI.NineSlicePlane(textureBtn, 4, 4, 4, 6);
	boardNo.width = 100;
	boardNo.height = 40;
	boardNo.x = w - 140;
	boardNo.y = toBot - 20;

	const useNLTLife = new PIXI.Text('Use my NLT life', smallFont);
	useNLTLife.x = w / 2;
	useNLTLife.anchor.x = 0.5;
	useNLTLife.anchor.y = 0.5;
	useNLTLife.y = h / 2 - 30;

	const nlt: PIXI.Sprite = PIXI.Sprite.from('metadata/0.webp');
	nlt.x = w / 2;
	nlt.y = h / 2 + 15;
	nlt.anchor.x = 0.5;
	nlt.anchor.y = 0.5;
	nlt.scale.x = 0.15;
	nlt.scale.y = 0.15;

	const remainingLife = new PIXI.Text('   1/2\nchallenge', smallFont);
	remainingLife.x = w / 2;
	remainingLife.anchor.x = 0.5;
	remainingLife.anchor.y = 0.5;
	remainingLife.y = h / 2 + 65;

	const tryAgainText = new PIXI.Text('Continue?', bigFont);
	tryAgainText.x = w / 2;
	tryAgainText.anchor.x = 0.5;
	tryAgainText.anchor.y = 0.5;
	tryAgainText.y = toBot - 30;

	const yesText = new PIXI.Text('Yes', bigFont);
	yesText.x = w / 2 - 50;
	yesText.anchor.x = 0.5;
	yesText.anchor.y = 0.5;
	yesText.y = toBot;

	const yesPriceText = new PIXI.Text(`${price} $NFTL`, smallFont);
	yesPriceText.x = w / 2 - 50;
	yesPriceText.anchor.x = 0.5;
	yesPriceText.anchor.y = 0.5;
	yesPriceText.y = toBot + 15;

	const noText = new PIXI.Text('No', bigFont);
	noText.x = w / 2 + 70;
	noText.anchor.x = 0.5;
	noText.anchor.y = 0.5;
	noText.y = toBot;

	const boardContainer = new PIXI.Container();
	boardContainer.addChild(board);
	boardContainer.addChild(boardYes);
	boardContainer.addChild(boardNo);
	for (let i = 0; i < scores.length; i++) {
		const scorelist = `${i + 1}) ${scores[i].score}Pts: ${scores[i].wallet} => ${
			scores[i].price
		}$NFTL`;
		const scoreList = new PIXI.Text(scorelist, xs);
		scoreList.x = 50;
		scoreList.y = h / 2 - 80 + i * 10;
		boardContainer.addChild(scoreList);
	}

	boardContainer.addChild(highestScoreText);
	boardContainer.addChild(spaceHight);
	boardContainer.addChild(weekhighestScoreText);
	boardContainer.addChild(spaceHight2);
	boardContainer.addChild(useNLTLife);
	boardContainer.addChild(nlt);
	boardContainer.addChild(remainingLife);
	boardContainer.addChild(tryAgainText);
	boardContainer.addChild(yesText);
	boardContainer.addChild(yesPriceText);
	boardContainer.addChild(noText);
	boardContainer.name = 'boardContainer';

	return boardContainer;
};
