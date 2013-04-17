/// <reference path="../../../src/pulsar/geom/Point.d.ts" />
module pulsar.geom {
    class Rectangle {
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        public bottom : number;
        public bottomRight : Point;
        public left : number;
        public right : number;
        public size : Point;
        public top : number;
        public topLeft : Point;
        public clone(): Rectangle;
        public contains(x: number, y: number): bool;
        public containsPoint(point: Point): bool;
        public containsRect(rect: Rectangle): bool;
        public copyFrom(sourceRect: Rectangle): void;
        public equals(toCompare: Rectangle): bool;
        public inflate(dx: number, dy: number): void;
        public inflatePoint(point: Point): void;
        public intersection(toIntersect: Rectangle): Rectangle;
        public intersects(toIntersect: Rectangle): bool;
        public isEmpty(): bool;
        public offset(dx: number, dy: number): void;
        public offsetPoint(point: Point): void;
        public setEmpty(): void;
        public setTo(xa: number, ya: number, widtha: number, heighta: number): void;
        public toString(): string;
        public union(toUnion: Rectangle): Rectangle;
    }
}
