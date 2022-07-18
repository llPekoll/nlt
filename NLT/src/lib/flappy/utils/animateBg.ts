export const animtateBg = (sky, ground, clouds, town, bushes, pipeSpeed:number) =>{
    sky.tilePosition.x -= 0.1 * pipeSpeed;
    ground.tilePosition.x -= 1 * pipeSpeed;
    clouds.tilePosition.x -= 0.5 * pipeSpeed;
    town.tilePosition.x -= 0.7 * pipeSpeed;
    bushes.tilePosition.x -= 0.8 * pipeSpeed;
}
