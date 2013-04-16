var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pulsar;
(function (pulsar) {
    (function (display) {
        var Sprite9 = (function (_super) {
            __extends(Sprite9, _super);
            function Sprite9(texture, size, scale9Grid) {
                if (typeof size === "undefined") { size = Sprite9.ZERO_POINT; }
                if (typeof scale9Grid === "undefined") { scale9Grid = Sprite9.ZERO_RECT; }
                        _super.call(this);
                this.texture = texture;
                this.scale9Grid = scale9Grid;
                this.cacheAsBitmap = false;
                this.scale9Sprites = [];
                var cols = [
                    0, 
                    scale9Grid.left, 
                    scale9Grid.right, 
                    texture.baseTexture.width
                ];
                var rows = [
                    0, 
                    scale9Grid.top, 
                    scale9Grid.bottom, 
                    texture.baseTexture.height
                ];
                var origin;
                var textureCount = 0;
                for(var cx = 0; cx < 3; cx++) {
                    for(var cy = 0; cy < 3; cy++) {
                        origin = new PIXI.Rectangle(cols[cx], rows[cy], Math.abs(cols[cx + 1] - cols[cx]), Math.abs(rows[cy + 1] - rows[cy]));
                        this.scale9Sprites[textureCount] = new PIXI.Sprite(new PIXI.Texture(texture.baseTexture, origin));
                        this.addChild(this.scale9Sprites[textureCount]);
                        textureCount++;
                    }
                }
                this.setSize(size);
            }
            Sprite9.ZERO_POINT = new PIXI.Point(0, 0);
            Sprite9.ZERO_RECT = new pulsar.geom.Rectangle(0, 0, 100, 100);
            Sprite9.prototype.setSize = function (size) {
                var draw;
                var origin;
                var textureCount = 0;
                var cols = [
                    0, 
                    this.scale9Grid.left, 
                    this.scale9Grid.right, 
                    this.texture.baseTexture.width
                ];
                var rows = [
                    0, 
                    this.scale9Grid.top, 
                    this.scale9Grid.bottom, 
                    this.texture.baseTexture.height
                ];
                var dRows = [
                    0, 
                    this.scale9Grid.top, 
                    size.y - (this.texture.baseTexture.height - this.scale9Grid.bottom), 
                    size.y
                ];
                var dCols = [
                    0, 
                    this.scale9Grid.left, 
                    size.x - (this.texture.baseTexture.width - this.scale9Grid.right), 
                    size.x
                ];
                for(var cx = 0; cx < 3; cx++) {
                    for(var cy = 0; cy < 3; cy++) {
                        origin = new PIXI.Rectangle(cols[cx], rows[cy], Math.abs(cols[cx + 1] - cols[cx]), Math.abs(rows[cy + 1] - rows[cy]));
                        draw = new PIXI.Rectangle(dCols[cx], dRows[cy], Math.abs(dCols[cx + 1] - dCols[cx]), Math.abs(dRows[cy + 1] - dRows[cy]));
                        this.scale9Sprites[textureCount].position.x = draw.x;
                        this.scale9Sprites[textureCount].position.y = draw.y;
                        if(!(textureCount == 0 || textureCount == 2 || textureCount == 6 || textureCount == 8)) {
                            this.scale9Sprites[textureCount].scale.x = origin.width / draw.width;
                            this.scale9Sprites[textureCount].scale.y = origin.height / draw.height;
                        }
                        textureCount++;
                    }
                }
            };
            return Sprite9;
        })(PIXI.DisplayObjectContainer);
        display.Sprite9 = Sprite9;        
    })(pulsar.display || (pulsar.display = {}));
    var display = pulsar.display;
})(pulsar || (pulsar = {}));
