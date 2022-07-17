import { Graphics } from "pixi.js";

export const setTurtleGraphic = (debug: boolean): Graphics => {
    const graphics = new Graphics();
    graphics.beginFill(0xff3300, 0.25);
    graphics.lineStyle(1, 0xffd900, 1);
    graphics.moveTo(0, 67);
    graphics.lineTo(40, 67);
    graphics.lineTo(40, 0);
    graphics.lineTo(0, 0);

    graphics.closePath();
    graphics.endFill();
    if (!debug) {
        graphics.alpha = 0;
    }
    return graphics;
}