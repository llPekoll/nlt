<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { Howl, Howler } from 'howler';
	import { collision, pipePassed, pipeGenerator } from './utils';
	import { NFTLLogo, scoreBoard } from './assets';

	export let inGame: boolean;
	export let turtle;
	export let score: number = 0;
	export let livesUsed: number = 0;
	export let w: number = 288;
	export let h: number = 512;
	export let bushes: PIXI.TilingSprite;
	export let sky: PIXI.TilingSprite;
	export let clouds: PIXI.TilingSprite;
	export let town: PIXI.TilingSprite;
	export let ground: PIXI.TilingSprite;
	export let turtleGraphics: PIXI.Graphics;

	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	let containerTurtle;
	let scoreText;
	let challengeText;
	let gameOver = false;
	let scorePassed = false;
	const priceScaler: number[] = [500, 5000, 50000];
	let highestScore: number;
	let challengeScore: number;

	const gratity: number = 0.6;
	const lift: number = -15;
	let velocity = 0;

	const nftlLLogo = NFTLLogo();
	var soundCoin = new Howl({ src: ['/flappy/sounds/sfx_point.wav'] });
	var sounddie = new Howl({ src: ['/flappy/sounds/sfx_die.wav'] });
	var soundHit = new Howl({ src: ['/flappy/sounds/sfx_hit.wav'] });
	soundHit.on('end', function () {
		sounddie.play();
	});

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

		const jumpTurtle = () => {
			if (!gameOver) {
				velocity += lift;
				velocity += 0.9;
			}
		};

		containerTurtle = new PIXI.Container();
		containerTurtle.addChild(turtleGraphics);
		containerTurtle.addChild(turtle);
		stage.addChild(containerTurtle);

		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();

		let frameCount = 1;
		let pipes: PIXI.Container[] = [];
		let pipeSpeed = 2;

		ground.name = 'ground';
		sky.interactive = true;
		sky.on('pointerdown', jumpTurtle);

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
			if (challengeText.x < -bounds.width) {
				challengeText.x = w + 20;
			}

			if (!gameOver) {
				if (turtle) {
					pipeGenerator(h, frameCount, pipes);

					sky.tilePosition.x -= 0.1 * pipeSpeed;
					ground.tilePosition.x -= 1 * pipeSpeed;
					clouds.tilePosition.x -= 0.5 * pipeSpeed;
					town.tilePosition.x -= 0.7 * pipeSpeed;
					bushes.tilePosition.x -= 0.8 * pipeSpeed;

					if (containerTurtle.y >= 417) {
						velocity = 0;
						containerTurtle.y = 417;
						gameOver = true;
					}
					if (containerTurtle.y <= -10) {
						velocity = 0;
						containerTurtle.y = -10;
						gameOver = true;
					}

					for (let i = pipes.length - 1; i >= 0; i--) {
						// pipe management
						stage.removeChild(pipes[i]);
						pipes[i].x -= pipeSpeed;
						if (pipes[i].x < -60) {
							pipes.splice(i, 1);
							scorePassed = false;
						}
						// colisiton check
						if (collision(pipes[i], turtleGraphics)) {
							if (!gameOver) {
								soundHit.stop();
							} else {
								soundHit.play();
							}
							gameOver = true;
						}
						if (pipePassed(pipes[i], turtleGraphics, scorePassed)) {
							score += 1;
							scorePassed = true;
							scoreText.text = score;
							soundCoin.play();
						}
						stage.addChild(pipes[i]);
					}
				}
			}
			if (gameOver && containerTurtle.y == 417) {
				const scores = [
					{ score: 25, wallet: '0x01...h1f', price: 60000 },
					{ score: 17, wallet: '0x01...31f', price: 6000 },
					{ score: 12, wallet: '0x01...54a', price: 600 }
				];
				livesUsed = 1;
				highestScore = 34;
				challengeScore = 12;
				const scoreboard = scoreBoard(
					w,
					h,
					livesUsed,
					scores,
					priceScaler,
					highestScore,
					challengeScore
				);
				stage.addChild(scoreboard);
			}
			if (turtle) {
				velocity += gratity;
				containerTurtle.y += velocity;
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
			stage.addChild(nftlLLogo);
			const board: PIXI.DisplayObject = stage.getChildByName('boardContainer');

			if (board) {
				stage.removeChild(board);
				stage.addChild(board);

				const yesBtn = board.getChildByName('yesBtn');
				const noBtn = board.getChildByName('noBtn');
				if (yesBtn) {
					yesBtn.on('pointerup', () => {
						yesBtn.y = 400;
					});
				}
				if (noBtn) {
					noBtn.on('pointerup', () => {
						noBtn.y = 400;
						inGame = false;
					});
				}
			}
			stage.addChild(containerTurtle);
			renderer.render(stage);
		}
	});
</script>

<div class="flex items-center justify-center">
	<canvas id="theGame" />
</div>
