<script>
	import * as PIXI from 'pixi.js';
	// 	import NTL1 from './0.json';
	// 	import NTL2 from './1.json';
	// 	import NTL3 from './2.json';
	import { onMount } from 'svelte';

	let inGame = true;

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
	let score = 0;	
	let scorePassed =false;
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
		const resize = () => {
			renderer.resize(w, h);
		};
		window.addEventListener('resize', resize);
        let gratity = .6
        let lift =-15;
        let velocity=0;

        const onClick = ()=>{
             velocity += lift;
             velocity += 0.9;
        }
		const handleLoadComplete = () => {
			texture = loader.resources.sheet.spritesheet;
			const textures = [
				texture.textures['bg 0.ase'],
				texture.textures['bg 1.ase'],
				texture.textures['bg 2.ase'],
				texture.textures['bg 1.ase']
			];
			turtle = new PIXI.AnimatedSprite(textures);
			turtle.animationSpeed = 0.1;
			turtle.anchor.x =.5
			turtle.anchor.y =.5
			turtle.play();

			stage.addChild(turtle);
			turtleGraphics = new PIXI.Graphics();
			turtleGraphics.beginFill(0xFF3300, 0.25);
			turtleGraphics.lineStyle(1, 0xffd900, 1);
			turtleGraphics.moveTo(0, 67);
			turtleGraphics.lineTo(40, 67);
			turtleGraphics.lineTo(40, 0);
			turtleGraphics.lineTo(0, 0);
			
			turtleGraphics.closePath();
			turtleGraphics.endFill();
			
			containerTurtle = new PIXI.Container();
			containerTurtle.addChild(turtle);
			containerTurtle.addChild(turtleGraphics);
			turtle.x =-60
			turtle.y =-35
			turtleGraphics.x = 100
			turtle.scale.x =.5
			turtle.scale.y =.5
			turtleGraphics.scale.y =.5
			turtleGraphics.scale.y =.5
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
        loader.add('sheet', '/flappy/turtle.json');
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
        const spacingBase = 70;
        let pipeSpeed =2
        let gameOver = false;

		const cloudsTexture = PIXI.Texture.from('/flappy/clouds.png');
		const townTexture = PIXI.Texture.from('/flappy/town.png');
		const bushesTexture = PIXI.Texture.from('/flappy/bushes.png');
		const groundTexture = PIXI.Texture.from('/flappy/assets/ground-sprite.png');
		const skyTexture = PIXI.Texture.from('/flappy/sky.png');
		sky = new PIXI.TilingSprite(
			skyTexture,
				w,
				h,
			);
		clouds = new PIXI.TilingSprite(
			cloudsTexture,
				w,
				h,
			);
		town = new PIXI.TilingSprite(
			townTexture,
				w,
				h,
			);
		bushes = new PIXI.TilingSprite(
			bushesTexture,
				w*2,
				h,
			);
		bushes.scale.x=.6
		bushes.scale.y=.6
		bushes.y=145
		ground = new PIXI.TilingSprite(
			groundTexture,
				w,
				h,
			);
		ground.y = 450
		ground.name = 'ground';
		sky.interactive = true;
		sky.on('pointerdown', onClick);

		stage.addChild(sky);
		stage.addChild(clouds);
		stage.addChild(town);
		stage.addChild(bushes);
		stage.addChild(ground);
		const style = new PIXI.TextStyle({
    		fontFamily: "VT323"
		});
		scoreText = new PIXI.Text(score, style);
		scoreText.anchor.x = .5
		scoreText.anchor.x = .5
		scoreText.x = w/2;
		scoreText.y = 20;
		scoreText.name = 'jism'
		stage.addChild(scoreText);

		function animate() {
			frameCount++;
            // const randTiming = Math.floor(Math.random() * 5);
            const randSpacing = Math.floor(Math.random() * 50);
            const sign = Math.random() < 0.5 ? -1 : 1;
            const randHightOffset = Math.floor(Math.random() * 100) * sign;
            
			if(!gameOver){
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
					){
						// console.log('trou de bol')
						pipes[i].children[0].alpha = .5
					}
					const cBox = pipes[i].children[1].getBounds();
					if (
						cBox.x + cBox.width > bBox.x &&
						cBox.x < bBox.x + bBox.width &&
						cBox.y + cBox.height > bBox.y &&
						cBox.y < bBox.y + bBox.height
					){
						// console.log('trou de bol')
						pipes[i].children[1].alpha = .5
					}
					if(aBox.x < bBox.x - bBox.width && !scorePassed){
						score +=1;
						scorePassed=true;
						scoreText.text = score
					
					}
				stage.addChild(pipes[i]);
                }
            }
			if (turtle) {
				// bg animation
				sky.tilePosition.x -= 0.1*pipeSpeed;
				ground.tilePosition.x -= 1*pipeSpeed;
				clouds.tilePosition.x -= .5*pipeSpeed;
				town.tilePosition.x -= .7*pipeSpeed;
				bushes.tilePosition.x -= .8*pipeSpeed;
                
				// turtle animation
                velocity += gratity
                containerTurtle.y += velocity;
                if (containerTurtle.y >= 417){
                    velocity=0
                    containerTurtle.y = 417
                }
                if (containerTurtle.y <= -10){
                    velocity=0
                    containerTurtle.y = -10
                }

                // pipe generation
				if (frameCount % (120) == 0) {
					frameCount = 1;
					const container = new PIXI.Container();
					const pipeInstanceBot = PIXI.Sprite.from('/flappy/assets/pipe-green-bottom.png');
					const pipeInstanceTop = PIXI.Sprite.from('/flappy/assets/pipe-green-top.png');
					
					// Gap managment
					pipeInstanceTop.y=-400 + randHightOffset - spacingBase + randSpacing;
					pipeInstanceBot.y=-50 + randHightOffset + spacingBase + randSpacing

					// container
					container.addChild(pipeInstanceBot);
					container.addChild(pipeInstanceTop);
					container.x = 700;
					container.y = h/2;
					pipes.push(container);
				}
			}
			// layer in correct order
			const jsim = stage.getChildByName('jism');
			const mmd = stage.getChildByName('ground');
			stage.removeChild(jsim)
			stage.removeChild(mmd)
			stage.addChild(scoreText);
			stage.addChild(ground);
			renderer.render(stage);
		}
	});
</script>

{#if inGame}
<div class="flex items-center justify-center">
	<canvas id="theGame" />
</div>
{:else}
	<canvas id="theMenu" />
{/if}