import * as PIXI from 'pixi.js';
import { AnimatedGIF } from '@pixi/gif';

export const Ads = (stage, w: number, h: number) => {
	const url = '/flappy/PUB_GIF_NFTL-export.gif';

	fetch(url)
		.then((res) => res.arrayBuffer())
		.then(AnimatedGIF.fromBuffer)
		.then((image) => {
			image.y = h - image.getBounds().height;
			image.name = 'ads';
			stage.addChild(image);
		});
};
