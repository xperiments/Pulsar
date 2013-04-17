/// <reference path="../../../src/libs/pixi.d.ts" />
/// <reference path="../../../src/pulsar/textures/BinaryPacker.d.ts" />
/// <reference path="../../../src/pulsar/utils/MathUtils.d.ts" />
module pulsar.textures {
    interface TextureAtlas {
        [s: string]: TextureAtlasElement;
    }
    interface TextureAtlasElement {
        frame: TextureAtlasFrame;
        rotated: bool;
        trimmed: bool;
        spriteSourceSize: TextureAtlasFrame;
        sourceSize: TextureAtlasSourceSize;
    }
    interface TextureAtlasFrame {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface TextureAtlasSourceSize {
        w: number;
        h: number;
    }
    class DynamicTextureAtlas {
        public uid: string;
        public shapePadding: number;
        private static LIBS;
        static getLibrary(id: string): DynamicTextureAtlas;
        private blocks;
        private context;
        public canvas: HTMLCanvasElement;
        public texture: PIXI.BaseTexture;
        public textureAtlas: TextureAtlas;
        constructor(uid: string, shapePadding?: number);
        public add(id: string, image: HTMLElement): void;
        private addFromDataURL(id, dataURL);
        public render(mode?: library.binpack.BinarySortType): void;
    }
}
