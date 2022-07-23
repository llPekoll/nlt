import * as PIXI from 'pixi.js';

interface NFT {
    id:number,
	image: string; // url
	name: string; // url
	lives: number;
	priceDiscount: number;
    locked:boolean;
}


export const NFTCard = (nft:NFT, y:number, x:number):PIXI.Container => {

    const card: PIXI.Container = new PIXI.Container();

    const textureBtn = PIXI.Texture.from('/flappy/btn.png');
	const bgCard = new PIXI.NineSlicePlane(textureBtn, 4, 4, 4, 6);
	bgCard.height = 90;
	bgCard.width = 75;


    const NFTLImage: PIXI.Sprite = PIXI.Sprite.from(nft.image.replace('https://nlt.rocks',''));
    NFTLImage.x = 10;
    NFTLImage.y = 10;
    NFTLImage.scale.x = 0.12;
    NFTLImage.scale.y = 0.12;
    card.name = `id${nft.id}`;
    
    const heart: PIXI.Sprite = PIXI.Sprite.from('/flappy/heart.png');
    heart.x = 55;
    heart.y = 10;
    heart.scale.x = 0.03;
    heart.scale.y = 0.03;
    let heart2: PIXI.Sprite
    let heart3: PIXI.Sprite
    if (nft.lives ==2){
        heart2 = PIXI.Sprite.from('/flappy/heart.png');
        heart.x = 20;
        heart.y = 0;
    }
    if (nft.lives ==3){
        heart2 = PIXI.Sprite.from('/flappy/heart.png');
        heart.x = 40;
        heart.y = 0;
    }

	const style: PIXI.TextStyle = new PIXI.TextStyle({
		fontSize: 6,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeThickness: 1,
		fontFamily: 'Press Start 2P',
		fontWeight: 'bold'
	});

    const name: PIXI.Text = new PIXI.Text(nft.name, style);
	name.x = 10;
	name.y = NFTLImage.getBounds().height + 10;

    const priceDiscount: PIXI.Text = new PIXI.Text(nft.priceDiscount, style);
	priceDiscount.x = NFTLImage.getBounds().width - 10;
	priceDiscount.y = NFTLImage.getBounds().height + 20;
    
    card.addChild(bgCard)
    card.addChild(NFTLImage)
    if (nft.lives ==3){
        
        card.addChild(heart3);
    }
    if (nft.lives ==2){
        card.addChild(heart2);
    }
    card.addChild(heart)
	card.addChild(name);
	card.addChild(priceDiscount);
    if (nft.locked){
        card.alpha = 0.5;
    }
    card.x = x;
	card.y = y;
    return card

}