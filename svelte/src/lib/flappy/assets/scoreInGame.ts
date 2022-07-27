import * as PIXI from 'pixi.js';

export const scoreInGame = (w: number, score: number): PIXI.Text => {
	const style = new PIXI.TextStyle({
		fontSize: 64,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 5,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold',
		dropShadow: true,
		dropShadowColor: '#000000'
	});
	const text = new PIXI.Text(score, style);
	text.anchor.x = 0.5;
	text.anchor.x = 0.5;
	text.x = w / 2;
	text.y = 20;
	text.name = 'scoreText';
	return text;
};
