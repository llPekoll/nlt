import * as PIXI from 'pixi.js';

interface Tutu {
	turtle: PIXI.AnimatedSprite;
	turtleGraphics: PIXI.Graphics;
	containerTurtle: PIXI.Container;
}

export const Turtle = (): Tutu => {
	let turtle;
	let turtleGraphics;
	let containerTurtle;
	const debug = false;
	const loader = PIXI.Loader.shared;
	const handleLoadComplete = () => {
		const texture = loader.resources.sheet_game.spritesheet;
		const textures = [
			texture.textures['bg 0.ase'],
			texture.textures['bg 1.ase'],
			texture.textures['bg 2.ase'],
			texture.textures['bg 1.ase']
		];
		turtle = new PIXI.AnimatedSprite(textures);
		turtle.animationSpeed = 0.1;
		turtle.anchor.x = 0.5;
		turtle.anchor.y = 0.5;
		turtle.play();

		turtleGraphics = new PIXI.Graphics();
		turtleGraphics.beginFill(0xff3300, 0.25);
		turtleGraphics.lineStyle(1, 0xffd900, 1);
		turtleGraphics.moveTo(0, 67);
		turtleGraphics.lineTo(40, 67);
		turtleGraphics.lineTo(40, 0);
		turtleGraphics.lineTo(0, 0);

		turtleGraphics.closePath();
		turtleGraphics.endFill();
		if (debug) {
			turtleGraphics.alpha = 0;
		}
		turtle.x = -60;
		turtle.y = -35;
		turtle.name = 'turtle';
		turtleGraphics.x = 100;
		turtle.scale.x = 0.5;
		turtle.scale.y = 0.5;
		turtleGraphics.scale.y = 0.5;
		turtleGraphics.scale.y = 0.5;
		containerTurtle = new PIXI.Container();
		containerTurtle.addChild(turtle);
		containerTurtle.addChild(turtleGraphics);
	};
	const handleLoadAsset = (loader, resource) => {
		console.log(`asset Loaded, ${resource.name}`);
	};
	const handleLoadError = (loader, resource) => {
		console.log('load error');
	};
	const handleLoadProgess = (loader, resource) => {
		console.log(`${loader.progress}%`);
	};
	loader.add('sheet_game', '/flappy/turtle.json');
	loader.onComplete.add(handleLoadComplete);
	loader.onProgress.add(handleLoadProgess);
	loader.onLoad.add(handleLoadAsset);
	loader.onError.add(handleLoadError);
	loader.load();
	return {
		turtle,
		turtleGraphics,
		containerTurtle
	};
};
