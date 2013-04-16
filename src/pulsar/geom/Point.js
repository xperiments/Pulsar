var pulsar;
(function (pulsar) {
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                this.x = x;
                this.y = y;
            }
            Point.prototype.add = function (p) {
                return new Point((this.x + p.x), (this.y + p.y));
            };
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            Point.distance = function distance(pt1, pt2) {
                var dx = pt2.x - pt1.x;
                var dy = pt2.y - pt1.y;
                return Math.sqrt(dx * dx + dy * dy);
            };
            Point.prototype.equals = function (toCompare) {
                return (toCompare.x === this.x && toCompare.y === this.y) ? true : false;
            };
            Point.interpolate = function interpolate(pt1, pt2, f) {
                return new Point(f * pt1.x + (1 - f) * pt2.x, f * pt1.y + (1 - f) * pt2.y);
            };
            Object.defineProperty(Point.prototype, "length", {
                get: function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                },
                enumerable: true,
                configurable: true
            });
            Point.prototype.normalize = function (thickness) {
                var x = this.x;
                var y = this.y;
                var l = this.length;
                if(l > 0) {
                    var f = this.length / l;
                    x *= f;
                    y *= f;
                }
                return new Point(x, y);
            };
            Point.prototype.offset = function (dx, dy) {
                return new Point(this.x + dx, this.y + dy);
            };
            Point.polar = function polar(len, angle) {
                return new Point(len * Math.cos(angle), len * Math.sin(angle));
            };
            Point.prototype.setTo = function (xa, ya) {
                this.x = xa;
                this.y = ya;
            };
            Point.prototype.subtract = function (v) {
                return new Point(this.x - v.x, this.y - v.y);
            };
            Point.prototype.toString = function () {
                return '(x=' + this.x + ', y=' + this.y + ')';
            };
            return Point;
        })();
        geom.Point = Point;        
    })(pulsar.geom || (pulsar.geom = {}));
    var geom = pulsar.geom;
})(pulsar || (pulsar = {}));
