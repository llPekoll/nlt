import { AnimatedGIF, AnimatedGIFLoader } from '@pixi/gif';
import { Loader } from '@pixi/loaders';

Loader.registerPlugin(AnimatedGIFLoader);

export const Ads = async (w: number, h: number) => {
	const url = '/flappy/PUB_GIF_NFTL-export.gif';
	const buffer = await fetch(url).then(res => res.arrayBuffer());
	const animation = AnimatedGIF.fromBuffer(buffer);
	animation.y = h - animation.getBounds().height;
	animation.name = 'ads';
	return animation;
};