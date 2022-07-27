import type * as PIXI from 'pixi.js';

export const pipePassed = (
	pipe: PIXI.Container,
	turtleGraphics: PIXI.Graphics,
	scorePassed: boolean
): boolean => {
	const aBox: PIXI.Rectangle = pipe.children[0].getBounds();
	const bBox: PIXI.Rectangle = turtleGraphics.getBounds();
	if (aBox.x < bBox.x - bBox.width && !scorePassed) {
		return true;
	}
	return false;
};
