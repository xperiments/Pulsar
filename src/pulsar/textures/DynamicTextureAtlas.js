var pulsar;
(function (pulsar) {
    (function (textures) {
        var DynamicTextureAtlas = (function () {
            function DynamicTextureAtlas(uid, shapePadding) {
                if (typeof shapePadding === "undefined") { shapePadding = 2; }
                this.uid = uid;
                this.shapePadding = shapePadding;
                this.blocks = [];
                DynamicTextureAtlas.LIBS[uid] = this;
                this.canvas = document.createElement('canvas');
                this.context = this.canvas.getContext('2d');
            }
            DynamicTextureAtlas.LIBS = [];
            DynamicTextureAtlas.getLibrary = function getLibrary(id) {
                return DynamicTextureAtlas.LIBS[id];
            };
            DynamicTextureAtlas.prototype.add = function (id, image) {
                var block;
                var shapePadding2x = this.shapePadding * 2;
                if(image instanceof HTMLImageElement) {
                    block = new pulsar.library.binpack.BinaryBlock(this.shapePadding, this.shapePadding, (image).width + shapePadding2x, (image).height + shapePadding2x, image, id);
                } else if(image instanceof HTMLCanvasElement) {
                    block = new pulsar.library.binpack.BinaryBlock(this.shapePadding, this.shapePadding, (image).width + shapePadding2x, (image).height + shapePadding2x, image, id);
                } else {
                    throw "Image element must be Canvas or Image";
                }
                this.blocks.push(block);
            };
            DynamicTextureAtlas.prototype.addFromDataURL = function (id, dataURL) {
                var image = new Image();
                image.src = dataURL;
                this.blocks.push(new pulsar.library.binpack.BinaryBlock(0, 0, image.width, image.height, image, id));
            };
            DynamicTextureAtlas.prototype.render = function (mode) {
                if (typeof mode === "undefined") { mode = pulsar.library.binpack.BinarySortType.MAX_SIDE; }
                var i;
                var t;
                var total;
                pulsar.library.binpack.BinaryPacker.pack(this.blocks, mode.toString());
                this.canvas.width = pulsar.utils.MathUtils.getNextPowerOfTwo(pulsar.library.binpack.BinaryPacker.root.w);
                this.canvas.height = pulsar.utils.MathUtils.getNextPowerOfTwo(pulsar.library.binpack.BinaryPacker.root.h);
                var textureAtlas = {
                };
                for(i = 0 , total = this.blocks.length; i < total; i++) {
                    var cur = this.blocks[i];
                    textureAtlas[this.uid + '.' + cur.id] = {
                        frame: {
                            x: cur.fit.x + this.shapePadding,
                            y: cur.fit.y + this.shapePadding,
                            w: cur.fit.w,
                            h: cur.fit.h
                        },
                        rotated: false,
                        trimmed: false,
                        spriteSourceSize: {
                            x: cur.fit.x + this.shapePadding,
                            y: cur.fit.y + this.shapePadding,
                            w: cur.fit.w,
                            h: cur.fit.h
                        },
                        sourceSize: {
                            w: cur.fit.w,
                            h: cur.fit.h
                        }
                    };
                    this.context.drawImage(cur.data, cur.fit.x + this.shapePadding, cur.fit.y + this.shapePadding);
                }
                this.texture = new PIXI.BaseTexture(this.canvas);
                this.textureAtlas = textureAtlas;
                for(t in textureAtlas) {
                    var rect = textureAtlas[t].frame;
                    if(rect) {
                        PIXI.TextureCache[t] = new PIXI.Texture(this.texture, {
                            x: rect.x,
                            y: rect.y,
                            width: rect.w,
                            height: rect.h
                        });
                        if(textureAtlas[t].trimmed) {
                            PIXI.TextureCache[t].realSize = textureAtlas[t].spriteSourceSize;
                            PIXI.TextureCache[t].trim.x = 0;
                        }
                    }
                }
                this.blocks = null;
                PIXI.texturesToUpdate.push(this.texture);
            };
            return DynamicTextureAtlas;
        })();
        textures.DynamicTextureAtlas = DynamicTextureAtlas;        
    })(pulsar.textures || (pulsar.textures = {}));
    var textures = pulsar.textures;
})(pulsar || (pulsar = {}));
