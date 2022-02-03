import * as PIXI from 'pixi.js';
import {animator} from './animator'
export function blockBuilder(fromBase, place) {
    const container = new PIXI.Container();
    
    const baseTexture = PIXI.BaseTexture.from('./hyptosis_tile-art-batch-1.png')

    for (let position of fromBase) {
        
        const rect1 = new PIXI.Rectangle((position.x - 1) * 32, (position.y - 1) * 32, 32, 32)
        const texture1 = new PIXI.Texture(baseTexture, rect1);
        const spr1 = new PIXI.Sprite(texture1);
        spr1.x = (place.x + position.nowx - 2) * 32;
        spr1.y = (place.y + position.nowy - 2) * 32;
        // sprites.push(spr1)
        container.addChild(spr1);

        // stack
        if (position.stack && position.animation) {
            // const animSprite = animator(position. filenames, {
            //     x: (place.x + position.nowx - 2) * 32,
            //     y: (place.y + position.nowy - 2) * 32,
            // } );
            position.animation.x = (place.x + position.nowx - 2) * 32;
            position.animation.y = (place.y + position.nowy - 2) * 32;
            container.addChild(position.animation);
        }
        
    }

    return container;
}