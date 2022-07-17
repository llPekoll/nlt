import * as PIXI from 'pixi.js';

export const NFTLLogo = (): PIXI.Container => {
	const container: PIXI.Container = new PIXI.Container();
	const NFTLLogo: PIXI.Sprite = PIXI.Sprite.from('/flappy/NFTL.webp');
	NFTLLogo.x = 10;
	NFTLLogo.y = 10;
	NFTLLogo.scale.x = 0.3;
	NFTLLogo.scale.y = 0.3;
	const style: PIXI.TextStyle = new PIXI.TextStyle({
		fontSize: 6,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 1,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold'
	});
	const subtitle: PIXI.Text = new PIXI.Text('Sponsored', style);
	subtitle.x = 10;
	subtitle.y = 70;
	container.addChild(NFTLLogo);
	container.addChild(subtitle);
	return container;
};
