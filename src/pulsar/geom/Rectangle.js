var pulsar;
(function (pulsar) {
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(Rectangle.prototype, "bottom", {
                get: function () {
                    return this.y + this.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "bottomRight", {
                get: function () {
                    return new pulsar.geom.Point(this.x + this.width, this.y + this.height);
                },
                set: function (v) {
                    this.width = v.x - this.x;
                    this.height = v.y - this.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "left", {
                get: function () {
                    return this.x;
                },
                set: function (value) {
                    this.x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "right", {
                get: function () {
                    return this.x + this.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "size", {
                get: function () {
                    return new pulsar.geom.Point(this.width, this.height);
                },
                set: function (v) {
                    this.width = v.x;
                    this.height = v.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "top", {
                get: function () {
                    return this.y;
                },
                set: function (value) {
                    this.y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "topLeft", {
                get: function () {
                    return new pulsar.geom.Point(this.x, this.y);
                },
                set: function (v) {
                    this.x = v.x;
                    this.y = v.y;
                },
                enumerable: true,
                configurable: true
            });
            Rectangle.prototype.clone = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            Rectangle.prototype.contains = function (x, y) {
                return !!(this.x <= x && this.y <= y && this.x + this.width > x && this.y + this.height > y);
            };
            Rectangle.prototype.containsPoint = function (point) {
                return this.contains(point.x, point.y);
            };
            Rectangle.prototype.containsRect = function (rect) {
                return !!(this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height);
            };
            Rectangle.prototype.copyFrom = function (sourceRect) {
                this.x = sourceRect.x;
                this.y = sourceRect.y;
                this.width = sourceRect.width;
                this.height = sourceRect.height;
            };
            Rectangle.prototype.equals = function (toCompare) {
                return !!(toCompare.x === this.x && toCompare.y === this.y && toCompare.width === this.width && toCompare.height === this.height);
            };
            Rectangle.prototype.inflate = function (dx, dy) {
                this.x -= dx;
                this.width += 2 * dx;
                this.y -= dy;
                this.height += 2 * dy;
            };
            Rectangle.prototype.inflatePoint = function (point) {
                this.inflate(point.x, point.y);
            };
            Rectangle.prototype.intersection = function (toIntersect) {
                var x1 = this.x;
                var y1 = this.y;
                var w1 = this.width;
                var h1 = this.height;
                var x2 = toIntersect.x;
                var y2 = toIntersect.y;
                var w2 = toIntersect.width;
                var h2 = toIntersect.height;
                if(w1 <= 0 || h1 <= 0 || w2 <= 0 || h2 <= 0) {
                    return new Rectangle(0, 0, 0, 0);
                }
                var l = (x1 > x2) ? x1 : x2;
                var r = (x1 + w1 < x2 + w2) ? x1 + w1 : x2 + w2;
                if(l >= r) {
                    return new Rectangle(0, 0, 0, 0);
                }
                var t = (y1 > y2) ? y1 : y2;
                var b = (y1 + h1 < y2 + h2) ? y1 + h1 : y2 + h2;
                if(t >= b) {
                    return new Rectangle(0, 0, 0, 0);
                }
                return new Rectangle(l, t, r - l, b - t);
            };
            Rectangle.prototype.intersects = function (toIntersect) {
                var x1 = this.x;
                var y1 = this.y;
                var w1 = this.width;
                var h1 = this.height;
                var x2 = toIntersect.x;
                var y2 = toIntersect.y;
                var w2 = toIntersect.width;
                var h2 = toIntersect.height;
                if(w1 <= 0 || h1 <= 0 || w2 <= 0 || h2 <= 0) {
                    return false;
                }
                return !!(x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1);
            };
            Rectangle.prototype.isEmpty = function () {
                return !!(this.width <= 0 || this.height <= 0);
            };
            Rectangle.prototype.offset = function (dx, dy) {
                this.x += dx;
                this.y += dy;
            };
            Rectangle.prototype.offsetPoint = function (point) {
                this.x += point.x;
                this.y += point.y;
            };
            Rectangle.prototype.setEmpty = function () {
                this.x = this.y = this.width = this.height = 0;
            };
            Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
                this.x = xa;
                this.y = ya;
                this.width = widtha;
                this.height = heighta;
            };
            Rectangle.prototype.toString = function () {
                return '(x=' + this.x + ', y=' + this.y + ', w=' + this.width + ', h=' + this.height + ')';
            };
            Rectangle.prototype.union = function (toUnion) {
                var x1 = this.x;
                var y1 = this.y;
                var w1 = this.width;
                var h1 = this.height;
                var x2 = toUnion.x;
                var y2 = toUnion.y;
                var w2 = toUnion.width;
                var h2 = toUnion.height;
                if(w1 <= 0 || h1 <= 0) {
                    return toUnion.clone();
                }
                if(w2 <= 0 || h2 <= 0) {
                    return this.clone();
                }
                var l = (x1 < x2) ? x1 : x2;
                var r = (x1 + w1 > x2 + w2) ? x1 + w1 : x2 + w2;
                var t = (y1 < y2) ? y1 : y2;
                var b = (y1 + h1 > y2 + h2) ? y1 + h1 : y2 + h2;
                return new Rectangle(l, t, r - l, b - t);
            };
            return Rectangle;
        })();
        geom.Rectangle = Rectangle;        
    })(pulsar.geom || (pulsar.geom = {}));
    var geom = pulsar.geom;
})(pulsar || (pulsar = {}));
