<script>
	import * as PIXI from 'pixi.js';
	import { Container, Ticker } from 'pixi.js';

	// 	import { Application, Text, Container } from 'svelte-pixi';
	// 	import Bg from '$lib/flappy/Bg.svelte';
	// 	import Bg2 from '$lib/flappy/Bg.svelte';
	// 	import Ground from '$lib/flappy/Ground.svelte';
	// 	import Title from '$lib/flappy/Title.svelte';
	// 	import Card from '$lib/flappy/Card.svelte';
	//   import ButtonStart from './flappy/ButtonStart.svelte';
	//   import FlashInfo from './flappy/FlashInfo.svelte';
	//   import NoNFTBtn from './flappy/NoNFTBtn.svelte';
	//   import ChallengeMode from './flappy/ChallengeMode.svelte';
	//   import Turtle from './flappy/Turtle.svelte';
	//   import Pipe from './flappy/Pipe.svelte';
	//   import Bush from './flappy/Bush.svelte';
	// 	import NTL1 from './0.json';
	// 	import NTL2 from './1.json';
	// 	import NTL3 from './2.json';
	// import Town from './flappy/Town.svelte';
	// import Clouds from './flappy/Clouds.svelte';
	import { onMount } from 'svelte';

	//   // let app;
	// 	let h = 0;
	// 	let w = 0;
	//   let speed = 1.5;
	// 	let nftSelected = 0;
	//   let inGame = false;
	//   let pressed = false;
	//   let challengeMode = false;
	//   let score=0
	//   let gameOver = false;
	//   let xTurtle =0;
	//   let yTurtle;
	// 	$: if (app && h && h) {
	// 		app.renderer.resize(w, h);
	// 	}

	// 	$: nltChosen = `NLT choosen ${nftSelected}`;
	//   let app = new PIXI.Application({ width: w, height: h });

	//   PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	//   let sky;
	//   let clouds;
	//   let turtle;
	//   let town;
	//   let bushes;
	//   let ground;
	//   let pipe;
	//   let frameCount =1;
	//   // let pipeTexture;
	//   const gameLoop = () => {
	//     frameCount ++;
	//       ground.tilePosition.x -= 2;
	//       bushes.tilePosition.x -= 1.7;
	//       town.tilePosition.x -= 1.5;
	//       clouds.tilePosition.x -= 1.2;
	//       pipe.x -= 1.2;
	//       let joses = []
	//       if(frameCount%40 ==0){
	//         const pipeTexture = PIXI.Texture.from('bg_pipes_0.png')
	//         const jose = new PIXI.Sprite(pipeTexture);
	//         jose.x = w/2;
	//         joses.push(jose)
	//         app.stage.addChild(jose);
	//         frameCount=1;

	//       }
	//       for(let i=0; i<joses.length; i++){
	//         console.log(joses)
	//         console.log(joses[0])
	//         joses[i].x -= 1.2;
	//       }
	//       console.log()
	//       const fly = () =>{
	//         turtle.x +=.1;
	//         }
	//         sky.on('pointerdown', fly);

	//   }
	//   const onAssetsLoaded = (loader, resources) =>{
	//     const textures = [
	//       PIXI.Texture.from('bg_turtle_0.png'),
	//       PIXI.Texture.from('bg_turtle_1.png'),
	//       PIXI.Texture.from('bg_turtle_2.png'),
	//       PIXI.Texture.from('bg_turtle_1.png')
	//     ];
	//     turtle = new PIXI.AnimatedSprite(textures);
	//     turtle.x = 150;
	//     turtle.y = app.screen.height / 1.5;
	//     turtle.anchor.set(0.5);
	//     turtle.play()
	//     turtle.animationSpeed = 0.1;

	//     const skyTexture = PIXI.Texture.from('bg_sky_0.png');

	//     sky = new PIXI.Sprite(skyTexture);
	//     sky.scale ={x:2,y:1}
	//     sky.interactive = true;

	//     const cloudsTexture = PIXI.Texture.from('bg_clouds_0.png');
	//     clouds = new PIXI.TilingSprite(
	//       cloudsTexture,
	//       app.screen.width,
	//       cloudsTexture.height,
	//     );

	//     const townTexture = PIXI.Texture.from('bg_town_0.png');
	//     town = new PIXI.TilingSprite(
	//       townTexture,
	//       app.screen.width,
	//       townTexture.height,
	//     );

	//     const bushesTexture = PIXI.Texture.from('bg_bushes_0.png');
	//     bushes = new PIXI.TilingSprite(
	//       bushesTexture,
	//       app.screen.width,
	//       bushesTexture.height,
	//     );

	//     const groundTexture = PIXI.Texture.from('bg_ground_0.png')
	//     ground = new PIXI.TilingSprite(
	//         groundTexture,
	//         app.screen.width,
	//         groundTexture.height,
	//       );

	//     const pipeTexture = PIXI.Texture.from('bg_pipes_0.png')
	//     pipe = new PIXI.Sprite(pipeTexture);

	//     app.stage.addChild(sky);
	//     app.stage.addChild(clouds);
	//     app.stage.addChild(town);
	//     app.stage.addChild(bushes);
	//     app.stage.addChild(pipe);
	//     app.stage.addChild(ground);
	//     app.stage.addChild(turtle);
	//     app.ticker.add(gameLoop);
	//   }

	// const loader = new PIXI.Loader();

	//   loader
	//     .add('spritesheet', "/flappy/sprite.json")
	//     .load(onAssetsLoaded);
	let h = 100;
	let w = 100;
	let bushes;
	let sky;
	let clouds;
	let texture;
	let town;
	let ground;
	let turtle;
	const loader = PIXI.Loader.shared;
	const stage = new PIXI.Container();

	onMount(() => {
		const canvas = document.getElementById('myCanvas');
		// document.body.appendChild(app.view);
		console.log(canvas);
		const renderer = new PIXI.Renderer({
			view: canvas,
			width: w,
			height: h,
			resolution: window.devicePixelRatio,
			autoDensity: true
		});
		const resize = () => {
			//  w = window.innerWidth
			//   h = window.innerHeight
			renderer.resize(w, h);
		};
		window.addEventListener('resize', resize);
		let mask;
        let gratity = .6
        let lift =-15;
        let velocity=0;

        const onClick = ()=>{
             velocity += lift;
             velocity += 0.9;
            
        }
		const handleLoadComplete = () => {
			texture = loader.resources.sheet.spritesheet;
			const wText = texture.textures['bg_ground_0.png'].orig.width;
			const hText = texture.textures['bg_ground_0.png'].orig.height;
			sky = new PIXI.Sprite(texture.textures['bg_sky_0.png']);
            sky.interactive = true;
            sky.on('pointerdown', onClick);
			clouds = new PIXI.TilingSprite(texture.textures['bg_clouds_0.png'], wText, hText);
			town = new PIXI.TilingSprite(texture.textures['bg_town_0.png'], wText, hText);
			bushes = new PIXI.TilingSprite(texture.textures['bg_bushes_0.png'], wText, hText);
			ground = new PIXI.TilingSprite(texture.textures['bg_ground_0.png'], wText, hText);
			const textures = [
				texture.textures['bg_turtle_0.png'],
				texture.textures['bg_turtle_1.png'],
				texture.textures['bg_turtle_2.png'],
				texture.textures['bg_turtle_1.png']
			];
			turtle = new PIXI.AnimatedSprite(textures);
			turtle.animationSpeed = 0.1;
			turtle.y = h / 4;
			turtle.x = -250;
			ground.scale.x = 1;
			turtle.play();
			stage.addChild(sky);
			stage.addChild(clouds);
			stage.addChild(town);
			stage.addChild(bushes);
			stage.addChild(turtle);
			stage.addChild(ground);
			mask = new PIXI.Graphics();
			mask.beginFill(0xffff00);
			mask.drawRect(0, 0, 1000, 553);
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
		loader.add('sheet', '/flappy/sprite.json');
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
		function animate() {
			frameCount++;
            const randTiming = Math.floor(Math.random() * 10);

            const randSpacing = Math.floor(Math.random() * 50);

            const sign = Math.random() < 0.5 ? -1 : 1;
            const randHightOffset = Math.floor(Math.random() * 100) * sign;

            const spacingBase = 70;
            const posTopBase = 540;
            const posBotBase = 33;
			for (let i = pipes.length - 1; i >= 0; i--) {
				stage.removeChild(pipes[i]);
				pipes[i].x -= 2;
				if (pipes[i].x < -400) {
					pipes.splice(i, 1);
				}
				if (pipes.length > 0) {
					stage.addChild(pipes[i]);
				}
                if(pipes[i].x - 308>turtle.x){
                    console.log(`pipe${i} passed`)
                }
			}
			if (turtle) {
				ground.tilePosition.x -= 2;
				clouds.tilePosition.x -= 1.2;
				town.tilePosition.x -= 1.3;
				bushes.tilePosition.x -= 1.7;
                // turtle animation
                velocity += gratity
                turtle.y += velocity;
                console.log(turtle.y)
                if (turtle.y >= 380){
                    turtle.y = 380
                }
                // pipe generation
				if (frameCount % (120 + randTiming) == 0) {
					frameCount = 1;
					const container = new PIXI.Container();
					const pipeInstanceBot = new PIXI.Sprite(texture.textures['bg_pipes_0.png']);
					const pipeInstanceTop = new PIXI.Sprite(texture.textures['bg_pipes_0.png']);

					pipeInstanceTop.y = posTopBase + randHightOffset - spacingBase - randSpacing;
					pipeInstanceBot.y = posBotBase + randHightOffset + spacingBase + randSpacing;
					pipeInstanceTop.scale.y = -1;
					container.addChild(pipeInstanceBot);
					container.addChild(pipeInstanceTop);
					container.x = 400;
					container.mask = mask;
					pipes.push(container);
				}
			}
			renderer.render(stage);
		}
	});
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<canvas id="myCanvas" />
<!-- <FPS /> -->
<!-- <Application bind:instance={app} render="demand" backgroundColor="0x33A5FF">

  {#if !inGame}
  <Container>

    <Bg2 />
    <Clouds bind:speed/>
    <Town bind:speed/>
    <Bush bind:speed/>
    <Ground bind:speed bind:score {h}/>
    <Title />
    <Text
      anchor={0.5}
      text="Chose your NFT"
      style={{ fill: 'black', fontFamily: 'VT323' }}
      x={w / 2}
      y="180"
    />
    <Card nft={NTL1} x={w / 2 - 150} y={230} id="1" bind:nftSelected />
    <Card nft={NTL2} x={w / 2 - 20} y={230} id="2" bind:nftSelected />
    <Card nft={NTL3} x={w / 2 + 100} y={230} id="3" bind:nftSelected />
    <NoNFTBtn x={5 + w / 2} y="420" />
    <ChallengeMode bind:challengeMode x={w/2} y=480/>
    <ButtonStart x={w/2} y=550 bind:inGame/>
    <FlashInfo x={w/2} y={h} w={w}/>
  </Container>
  {:else}
  <Container>
    <Bg bind:pressed/>
    <Clouds bind:speed/>
    <Town bind:speed/>
    <Bush bind:speed/>
    <Turtle bind:pressed {w} {h} bind:xTurtle bind:yTurtle bind:gameOver/>
    <Pipe {w} {h} bind:speed {xTurtle} {yTurtle} bind:score bind:gameOver/>
    <Ground bind:speed bind:score/>

  </Container>
  {/if}
</Application> -->
