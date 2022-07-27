export const animtateBg = (sky, ground, clouds, town, bushes, pipeSpeed: number) => {
	const skySpeed: number = 0.1;
	const groundSpeed: number = 1;
	const cloudsSpeed: number = 0.5;
	const townSpeed: number = 0.7;
	const bushesSpeed: number = 0.8;

	sky.tilePosition.x -= skySpeed * pipeSpeed;
	ground.tilePosition.x -= groundSpeed * pipeSpeed;
	clouds.tilePosition.x -= cloudsSpeed * pipeSpeed;
	town.tilePosition.x -= townSpeed * pipeSpeed;
	bushes.tilePosition.x -= bushesSpeed * pipeSpeed;
};
