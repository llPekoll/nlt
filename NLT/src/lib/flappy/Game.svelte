<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { Howl, Howler } from 'howler';
	import { collision, pipePassed, pipeGenerator, animtateBg } from './utils';
	import { NFTLLogo, scoreBoard, labelHighScore, scoreInGame } from './assets';

	export let inGame: boolean;
	export let turtle;
	export let score: number = 0;
	export let livesUsed: number;
	export let w: number = 288;
	export let h: number = 512;
	export let bushes: PIXI.TilingSprite;
	export let sky: PIXI.TilingSprite;
	export let clouds: PIXI.TilingSprite;
	export let town: PIXI.TilingSprite;
	export let ground: PIXI.TilingSprite;
	export let turtleGraphics: PIXI.Graphics;
	export let renderer: PIXI.Renderer;
	export let stage: PIXI.Container;
	export let restart;
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	let gameOver = false;
	let scorePassed = false;
	const priceScaler: number[] = [500, 5000, 50000];
	let highestScore: number = 34;
	let challengeScore: number = 12;
	let boardReadyDisplay: boolean = true;

	const gratity: number = 0.6;
	const lift: number = -15;
	let velocity = 0;

	const nftlLLogo = NFTLLogo();
	const challengeText = labelHighScore();
	const scoreDisplay = scoreInGame(w, score);
	var soundCoin = new Howl({ src: ['/flappy/sounds/sfx_point.wav'] });
	var sounddie = new Howl({ src: ['/flappy/sounds/sfx_die.wav'] });
	var soundHit = new Howl({ src: ['/flappy/sounds/sfx_hit.wav'] });
	soundHit.on('end', function () {
		sounddie.play();
	});
	let frameCount;
	let pipes: PIXI.Container[];
	ground.name = 'ground';
	const jumpTurtle = () => {
		if (!gameOver) {
			velocity += lift;
			velocity += 0.9;
		}
	};
	sky.interactive = true;
	sky.on('pointerdown', jumpTurtle);
	onMount(() => {
		const init = () => {
			frameCount = 1;
			pipes = [];
			stage.addChild(sky);
			stage.addChild(clouds);
			stage.addChild(town);
			stage.addChild(bushes);
			turtleGraphics.x = 60;
			turtleGraphics.y = 175;
			boardReadyDisplay = true;
			turtle.y = 135;
			turtle.x = -100;
		};
		init();

		const ticker = new PIXI.Ticker();
		ticker.add(animate);
		ticker.start();

		function animate() {
			frameCount++;
			turtle.x = -100;

			if (!gameOver) {
				const pipeSpeed = 2;
				animtateBg(sky, ground, clouds, town, bushes, pipeSpeed);
				if (turtle) {
					pipeGenerator(h, frameCount, pipes);
					if (frameCount % 120 == 0) {
						frameCount = 1;
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
							scoreDisplay.text = score;
							soundCoin.play();
						}
						stage.addChild(pipes[i]);
					}
				}
			}
			if (turtleGraphics.y >= 417) {
				velocity = 0;
				turtleGraphics.y = 417;
				gameOver = true;
			}
			if (turtleGraphics.y <= -10) {
				velocity = 0;
				turtleGraphics.y = -10;
				gameOver = true;
			}

			if (gameOver && turtleGraphics.y >= 417) {
				const scores = [
					{ score: 25, wallet: '0x01...h1f', price: 60000 },
					{ score: 17, wallet: '0x01...31f', price: 6000 },
					{ score: 12, wallet: '0x01...54a', price: 600 }
				];
				const scoreboard = scoreBoard(
					w,
					h,
					livesUsed,
					scores,
					priceScaler,
					highestScore,
					challengeScore
				);

				if (boardReadyDisplay) {
					stage.addChild(scoreboard);
					boardReadyDisplay = false;
				}

				const yesBtn = scoreboard.getChildByName('yesBtn');
				const noBtn = scoreboard.getChildByName('noBtn');

				if (yesBtn) {
					yesBtn.on('pointerup', () => {
						yesBtn.y = 400;
						stage.destroy();
						stage = new PIXI.Container();
						stage.name = 'stage';
						gameOver = false;
						livesUsed++;
						init();
					});
				}
				if (noBtn) {
					noBtn.on('pointerup', () => {
						noBtn.y = 400;
						inGame = false;
						livesUsed = 0;
					});
				}
			}

			challengeText.x -= 1;
			stage.addChild(scoreDisplay);
			stage.addChild(ground);
			const board: PIXI.DisplayObject = stage.getChildByName('boardContainer');
			if (board) {
				stage.removeChild(board);
				stage.addChild(board);
			}
			if (turtle && inGame) {
				stage.addChild(turtleGraphics);
				stage.addChild(turtle);
				velocity += gratity;
				turtle.y += velocity;
				turtleGraphics.y += velocity;
			}
			stage.addChild(nftlLLogo);
			stage.addChild(challengeText);
			renderer.render(stage);
		}
	});
</script>
