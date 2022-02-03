import * as PIXI from 'pixi.js';
export function animator(fileNames, position) {
    const frames = [];
    for (let file of fileNames) {
        frames.push(PIXI.Texture.from(file));
    }

    const anim = new PIXI.AnimatedSprite(frames);
    anim.x = position.x;
    anim.y = position.y;

    return anim;
}