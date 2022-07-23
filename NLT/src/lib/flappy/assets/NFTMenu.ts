import * as PIXI from 'pixi.js';


const NFTcard = (nft, id) => {

    const container: PIXI.Container = new PIXI.Container();
    const NFTLLogo: PIXI.Sprite = PIXI.Sprite.from(nft.image);
    NFTLLogo.x = 10;
    NFTLLogo.y = 10;
    NFTLLogo.scale.x = 0.3;
    NFTLLogo.scale.y = 0.3;
    container.name = `id${id}`;

}