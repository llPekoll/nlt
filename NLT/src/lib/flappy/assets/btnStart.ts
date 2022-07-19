import * as PIXI from 'pixi.js';
export const btnStart = (w: number, h: number): PIXI.Container => {
	const container = new PIXI.Container();
	const startGame = (up) => {
		if (up) container.y += 3;
		else container.y -= 3;
	};
	const startBtn = new PIXI.NineSlicePlane(PIXI.Texture.from('/flappy/btn.png'), 4, 4, 4, 6);
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
	const startText = new PIXI.Text('Start', styleChal);
	startText.x = 35;
	startText.y = 5;

	startBtn.height = 30;
	startBtn.height = 30;
	startBtn.width = 130;
	container.name = 'btnStart';
	container.interactive = true;
	container.buttonMode = true;

	container.on('pointerdown', () => {
		startGame(true);
	});
	container.on('pointerupoutside', () => {
		startGame(false);
	});

	container.addChild(startBtn);
	container.addChild(startText);
	container.x = w / 2 - container.getBounds().width / 2;
	container.y = h / 2;
	return container;
};
