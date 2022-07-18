import * as PIXI from 'pixi.js';

const sign = Math.random() < 0.5 ? -1 : 1;
const randSpacing = Math.floor(Math.random() * 70);
const randHightOffset = Math.floor(Math.random() * 120) * sign;
const spacingBase = 100;

export const pipeGenerator = (h:number, frameCount: number, pipes:PIXI.Container[]):PIXI.Container[] => {

    if (frameCount % 120 == 0) {
        frameCount = 1;
        const container:PIXI.Container = new PIXI.Container();
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