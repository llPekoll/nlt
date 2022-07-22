import * as PIXI from 'pixi.js';
export const challengeBtns = (
	w: number,
	h: number
): {
	freeContainer: PIXI.Container;
	ChallengeContainer: PIXI.Container;
	selected: PIXI.Text;
	noAds: PIXI.Text;
} => {
	const freeContainer = new PIXI.Container();
	const startGame = (up) => {
		if (up) freeContainer.y += 3;
		else freeContainer.y -= 3;
	};
	const freeBtn = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
	const styleChal = new PIXI.TextStyle({
		fontSize: 12,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold',
		dropShadow: true,
		dropShadowColor: '#000000',
		align: 'center'
	});

	const freeText = new PIXI.Text('Free', styleChal);
	freeText.x = 35;
	freeText.y = 5;

	freeBtn.height = 30;
	freeBtn.height = 30;
	freeBtn.width = 130;
	freeContainer.name = 'btnStart';
	freeContainer.interactive = true;
	freeContainer.buttonMode = true;

	freeContainer.on('pointerdown', () => {
		startGame(true);
	});
	freeContainer.on('pointerupoutside', () => {
		startGame(false);
	});

	freeContainer.addChild(freeBtn);
	freeContainer.addChild(freeText);
	freeContainer.x = 10;
	freeContainer.y = h / 2 + 50;

	const ChallengeContainer = new PIXI.Container();
	const startGameChall = (up) => {
		if (up) ChallengeContainer.y += 3;
		else ChallengeContainer.y -= 3;
	};
	const ChalBtn = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
	const chalText = new PIXI.Text('Chall', styleChal);
	chalText.x = 35;
	chalText.y = 5;

	ChalBtn.height = 30;
	ChalBtn.width = 130;
	ChallengeContainer.name = 'btnStart';
	ChallengeContainer.interactive = true;
	ChallengeContainer.buttonMode = true;

	ChallengeContainer.addChild(ChalBtn);
	ChallengeContainer.addChild(chalText);
	ChallengeContainer.x = w - ChallengeContainer.getBounds().width - 10;
	ChallengeContainer.y = h / 2 + 50;
	ChallengeContainer.on('pointerdown', () => {
		startGameChall(true);
	});
	ChallengeContainer.on('pointerupoutside', () => {
		startGameChall(false);
	});
	const selected = new PIXI.Text('Selected: \nFree to play', styleChal);
	selected.x = w / 2;
	selected.anchor.x = 0.5;
	selected.anchor.y = 0.5;
	selected.y = h - 120;
	const styleChalSmall = new PIXI.TextStyle({
		fontSize: 8,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold',
		dropShadow: true,
		dropShadowColor: '#000000',
		dropShadowDistance: 2,
		align: 'center'
	});
	const noAds = new PIXI.Text('- no Ads if nlt -', styleChalSmall);
	noAds.anchor.x = 0.5;
	noAds.anchor.y = 0.5;
	noAds.y = 30;
	selected.addChild(noAds);

	return { freeContainer, ChallengeContainer, selected, noAds };
};
