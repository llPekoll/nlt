<script>
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';

	export let inGame;

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	let w = 288;
	let h = 512;
	let bushes;
	let sky;
	let clouds;
	let texture;
	let town;
	let ground;
	let turtle;
	let turtleGraphics;
	let containerTurtle;
	let scoreText;
	let challengeText;
	let score = 0;
	let scorePassed = false;
	const debug = false;
	const loader = PIXI.Loader.shared;
	const stage = new PIXI.Container();

	onMount(() => {
		const canvas = document.getElementById('theGame');

		const renderer = new PIXI.Renderer({
			view: canvas,
			width: w,
			height: h,
			resolution: window.devicePixelRatio,
			autoDensity: true
		});
		let gratity = 0.6;
		let lift = -15;
		let velocity = 0;

		const onClick = () => {
			velocity += lift;
			velocity += 0.9;
		};
		const handleLoadComplete = () => {
			texture = loader.resources.koko.spritesheet;
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

			stage.addChild(turtle);
			turtleGraphics = new PIXI.Graphics();
			turtleGraphics.beginFill(0xff3300, 0.25);
			turtleGraphics.lineStyle(1, 0xffd900, 1);
			turtleGraphics.moveTo(0, 67);
			turtleGraphics.lineTo(40, 67);
			turtleGraphics.lineTo(40, 0);
			turtleGraphics.lineTo(0, 0);

			turtleGraphics.closePath();
			turtleGraphics.endFill();
			if (!debug) {
				turtleGraphics.alpha = 0;
			}

			containerTurtle = new PIXI.Container();
			containerTurtle.addChild(turtle);
			containerTurtle.addChild(turtleGraphics);
			turtle.x = -60;
			turtle.y = -35;
			turtleGraphics.x = 100;
			turtle.scale.x = 0.5;
			turtle.scale.y = 0.5;
			turtleGraphics.scale.y = 0.5;
			turtleGraphics.scale.y = 0.5;
			stage.addChild(containerTurtle);
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
		loader.add('koko', '/flappy/turtle.json');
		loader.onComplete.add(handleLoadComplete);
		loader.onProgress.add(handleLoadProgess);
		loader.onLoad.add(handleLoadAsset);
		loader.onError.add(handleLoadError);
		loader.load();

		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();
		let frameCount = 1;
		let pipes = [];
		const spacingBase = 100;
		let pipeSpeed = 2;
		let gameOver = false;

		const cloudsTexture = PIXI.Texture.from('/flappy/clouds.png');
		const townTexture = PIXI.Texture.from('/flappy/town.png');
		const bushesTexture = PIXI.Texture.from('/flappy/bushes.png');
		const groundTexture = PIXI.Texture.from('/flappy/assets/ground-sprite.png');
		const skyTexture = PIXI.Texture.from('/flappy/sky.png');
		sky = new PIXI.TilingSprite(skyTexture, w, h);
		clouds = new PIXI.TilingSprite(cloudsTexture, w, h);
		town = new PIXI.TilingSprite(townTexture, w, h);
		bushes = new PIXI.TilingSprite(bushesTexture, w * 2, h);
		bushes.scale.x = 0.6;
		bushes.scale.y = 0.6;
		bushes.y = 145;
		ground = new PIXI.TilingSprite(groundTexture, w, h);
		ground.y = 450;
		ground.name = 'ground';
		sky.interactive = true;
		sky.on('pointerdown', onClick);

		stage.addChild(sky);
		stage.addChild(clouds);
		stage.addChild(town);
		stage.addChild(bushes);
		stage.addChild(ground);
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
		scoreText = new PIXI.Text(score, style);
		scoreText.anchor.x = 0.5;
		scoreText.anchor.x = 0.5;
		scoreText.x = w / 2;
		scoreText.y = 20;
		scoreText.name = 'jism';
		stage.addChild(scoreText);

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

		challengeText = new PIXI.Text(score, styleChal);
		challengeText.name = 'chal';
		challengeText.y = 480;
		challengeText.x = 500;
		challengeText.text =
			'PRICE -> 1:3409NFTL, 2:213NFTL, 3: 90NFTL      SCORE-> 1: 13Pts, 0x03..23, 2: 5Pts, 0x03..23, 3: 4Pts, 0x03..23';
		stage.addChild(challengeText);

		function animate() {
			frameCount++;
			// const randTiming = Math.floor(Math.random() * 5);
			challengeText.x -= 1;
			const bounds = challengeText.getBounds();
			console.log(bounds.width);
			if (challengeText.x < -bounds.width) {
				challengeText.x = w + 20;
			}
			const sign = Math.random() < 0.5 ? -1 : 1;
			const randSpacing = Math.floor(Math.random() * 70);
			const randHightOffset = Math.floor(Math.random() * 120) * sign;

			if (!gameOver) {
				for (let i = pipes.length - 1; i >= 0; i--) {
					// pipe management
					stage.removeChild(pipes[i]);
					pipes[i].x -= pipeSpeed;
					if (pipes[i].x < -60) {
						pipes.splice(i, 1);
						scorePassed = false;
					}
					// colisiton check
					const aBox = pipes[i].children[0].getBounds();
					const bBox = turtleGraphics.getBounds();
					if (
						aBox.x + aBox.width > bBox.x &&
						aBox.x < bBox.x + bBox.width &&
						aBox.y + aBox.height > bBox.y &&
						aBox.y < bBox.y + bBox.height
					) {
						// console.log('trou de bol')
						pipes[i].children[0].alpha = 0.5;
					}
					const cBox = pipes[i].children[1].getBounds();
					if (
						cBox.x + cBox.width > bBox.x &&
						cBox.x < bBox.x + bBox.width &&
						cBox.y + cBox.height > bBox.y &&
						cBox.y < bBox.y + bBox.height
					) {
						// console.log('trou de bol')
						pipes[i].children[1].alpha = 0.5;
					}
					if (aBox.x < bBox.x - bBox.width && !scorePassed) {
						score += 1;
						scorePassed = true;
						scoreText.text = score;
					}
					stage.addChild(pipes[i]);
				}
			}
			if (turtle) {
				// bg animation
				sky.tilePosition.x -= 0.1 * pipeSpeed;
				ground.tilePosition.x -= 1 * pipeSpeed;
				clouds.tilePosition.x -= 0.5 * pipeSpeed;
				town.tilePosition.x -= 0.7 * pipeSpeed;
				bushes.tilePosition.x -= 0.8 * pipeSpeed;

				// turtle animation
				velocity += gratity;
				containerTurtle.y += velocity;
				if (containerTurtle.y >= 417) {
					velocity = 0;
					containerTurtle.y = 417;
				}
				if (containerTurtle.y <= -10) {
					velocity = 0;
					containerTurtle.y = -10;
				}

				// pipe generation
				if (frameCount % 120 == 0) {
					frameCount = 1;
					const container = new PIXI.Container();
					const pipeInstanceBot = PIXI.Sprite.from('/flappy/assets/pipe-green-bottom.png');
					const pipeInstanceTop = PIXI.Sprite.from('/flappy/assets/pipe-green-top.png');

					// Gap managment
					pipeInstanceTop.y = -400 + randHightOffset - (spacingBase - randSpacing);
					pipeInstanceBot.y = -50 + randHightOffset + (spacingBase - randSpacing);

					// container
					container.addChild(pipeInstanceBot);
					container.addChild(pipeInstanceTop);
					container.x = 700;
					container.y = h / 2;
					pipes.push(container);
				}
			}
			// layer in correct order
			const jsim = stage.getChildByName('jism');
			const mmd = stage.getChildByName('ground');
			const sako = stage.getChildByName('chal');
			stage.removeChild(jsim);
			stage.removeChild(mmd);
			stage.removeChild(sako);
			stage.addChild(scoreText);
			stage.addChild(ground);
			stage.addChild(challengeText);
			renderer.render(stage);
		}
	});
</script>

<div class="flex items-center justify-center">
	<canvas id="theGame" />
</div>
