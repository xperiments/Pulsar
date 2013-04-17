module pulsar.library.binpack {
    interface IBinaryBlock {
        x: number;
        y: number;
        w: number;
        h: number;
        id?: string;
        data?: any;
        area?: number;
        used?: bool;
        down?: IBinaryBlock;
        right?: IBinaryBlock;
        fit?: IBinaryBlock;
    }
    class BinaryBlock implements IBinaryBlock {
        public x: number;
        public y: number;
        public w: number;
        public h: number;
        public data: any;
        public id: string;
        public area: number;
        public used: bool;
        public down: BinaryBlock;
        public right: BinaryBlock;
        public fit: BinaryBlock;
        constructor(x: number, y: number, w: number, h: number, data: any, id: string);
    }
    interface IBinarySort {
        (a: IBinaryBlock, b: IBinaryBlock): number;
    }
    class BinarySortType {
        private value;
        constructor(value: string);
        public toString(): string;
        static WIDTH: BinarySortType;
        static HEIGHT: BinarySortType;
        static MAX_SIDE: BinarySortType;
        static AREA: BinarySortType;
    }
    class BinarySort {
        static w(a: IBinaryBlock, b: IBinaryBlock): number;
        static h(a: IBinaryBlock, b: IBinaryBlock): number;
        static a(a: IBinaryBlock, b: IBinaryBlock): number;
        static max(a: IBinaryBlock, b: IBinaryBlock): number;
        static min(a: IBinaryBlock, b: IBinaryBlock): number;
        static height(a: IBinaryBlock, b: IBinaryBlock): number;
        static width(a: IBinaryBlock, b: IBinaryBlock): number;
        static area(a: IBinaryBlock, b: IBinaryBlock): number;
        static maxside(a: IBinaryBlock, b: IBinaryBlock): number;
        static sort(blocks: IBinaryBlock[], sort: string): void;
        private static msort(a, b, criteria);
    }
    class BinaryPacker {
        static root: IBinaryBlock;
        static pack(blocks: IBinaryBlock[], mode: string): void;
        private static fit(blocks);
        private static findNode(root, w, h);
        private static splitNode(node, w, h);
        private static growNode(w, h);
        private static growRight(w, h);
        private static growDown(w, h);
    }
}
