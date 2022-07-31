import * as PIXI from 'pixi.js';

export const labelHighScore = (): PIXI.Text => {
	const css = new PIXI.TextStyle({
		fontSize: 12,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 2,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold',
		dropShadow: true,
		dropShadowColor: '#000000'
	});

	const label = new PIXI.Text('', css);
	label.name = 'labelHighschore';
	label.y = 480;
	label.x = 500;
	label.text = 'Loading .....';

	return label;
};
