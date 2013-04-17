module pulsar.geom {
    class Point {
        public x: number;
        public y: number;
        constructor(x?: number, y?: number);
        public add(p: Point): Point;
        public clone(): Point;
        static distance(pt1: Point, pt2: Point): number;
        public equals(toCompare: Point): bool;
        static interpolate(pt1: Point, pt2: Point, f: number): Point;
        public length : number;
        public normalize(thickness: number): Point;
        public offset(dx: number, dy: number): Point;
        static polar(len: number, angle: number): Point;
        public setTo(xa: number, ya: number): void;
        public subtract(v: Point): Point;
        public toString(): string;
    }
}
