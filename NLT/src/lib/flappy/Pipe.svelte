<script>
    import { Sprite, onTick, Loader } from 'svelte-pixi'
    import * as PIXI from 'pixi.js'
    export let w
    export let h
    export let xTurtle
    export let yTurtle
    export let speed;
    export let score;
    export let gameOver;
    let xPipe = w
    let rand = Math.floor(Math.random() * 100 + 30);;
    let pipes = [{x:xPipe+100, y:rand,scorePAssed:false}]
    let frameCount =0;
    let spaceInbetweenPipies = 100;
    let offsetHole = Math.floor(Math.random() * 50)
    onTick((delta) => {
        
        frameCount ++;
        for(let i = pipes.length -1;i>=0; i--){

            pipes[i].x -= speed
            if(pipes[i].x<-100){
                pipes.splice(i, 1)
            }
            if (xTurtle>=pipes[i].x && xTurtle<=pipes[i].x+20){
                if(!pipes[i].scorePAssed){
                    score +=1;
                    pipes[i].scorePAssed =true
                }
                if(yTurtle<=(h/2)-spaceInbetweenPipies || yTurtle>=(h/2)+spaceInbetweenPipies){
                    speed = 0;
                    gameOver = true
                }
            }
        }
        if(frameCount % 250 == 0){
            frameCount=0
            rand = Math.floor(Math.random() * 100 + 30);;
            pipes.push({x:w+100, y:rand})
        }
	});
    const mask = PIXI.Sprite.from('bg_maskground_0.png');
  </script>
  {#each pipes as {x,y}}
  <Loader resources={['/flappy/sprite.json']}>
    <Sprite
        texture={PIXI.Texture.from('bg_pipes_0.png')}
        anchor={0.5}
        scale={1}
        {mask}
        {x}
        y=400
    />
    
    <Sprite
        texture={PIXI.Texture.from('bg_pipes_0.png')}
        anchor={0.5}
        scale={-1}
        {x}
        y={h-h+spaceInbetweenPipies}
    />
</Loader>
  {/each}