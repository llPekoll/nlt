import * as PIXI from 'pixi.js';

export const animationLoader = (texture: PIXI.Spritesheet, name: string): PIXI.AnimatedSprite => {
	const textures = [
		texture.textures['bg2 0.ase'],
		texture.textures['bg2 1.ase'],
		texture.textures['bg2 2.ase'],
		texture.textures['bg2 1.ase']
	];
	const animatedSpite = new PIXI.AnimatedSprite(textures);
	animatedSpite.animationSpeed = 0.1;
	animatedSpite.anchor.x = 0.5;
	animatedSpite.anchor.y = 0.5;
	animatedSpite.x = -200;
	animatedSpite.y = 95;
	animatedSpite.play();

	// animatedSpite.scale.x = 0.5;
	// animatedSpite.scale.y = 0.5;
	animatedSpite.name = name;
	return animatedSpite;
};
