/// <reference path="../../../src/libs/pixi.d.ts" />
/// <reference path="../../../src/pulsar/geom/Rectangle.d.ts" />
module pulsar.display {
    class Sprite9 extends PIXI.DisplayObjectContainer {
        public texture: PIXI.Texture;
        public scale9Grid: geom.Rectangle;
        private scale9Sprites;
        private static ZERO_POINT;
        private static ZERO_RECT;
        public cacheAsBitmap: bool;
        private _size;
        constructor(texture: PIXI.Texture, size?: PIXI.Point, scale9Grid?: geom.Rectangle);
        public setSize(size: PIXI.Point): void;
    }
}
