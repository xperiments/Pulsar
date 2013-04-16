var pulsar;
(function (pulsar) {
    (function (utils) {
        var Scale9 = (function () {
            function Scale9() { }
            Scale9.canvas = document.createElement('canvas');
            Scale9.context = Scale9.canvas.getContext('2d');
            Scale9.getStaticTexture = function getStaticTexture(image, rect, width, height) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 100; }
                Scale9.canvas.width = width;
                Scale9.canvas.height = height;
                var rows = [
                    0, 
                    rect.top, 
                    rect.bottom, 
                    image.height
                ];
                var cols = [
                    0, 
                    rect.left, 
                    rect.right, 
                    image.width
                ];
                var dRows = [
                    0, 
                    rect.top, 
                    height - (image.height - rect.bottom), 
                    height
                ];
                var dCols = [
                    0, 
                    rect.left, 
                    width - (image.width - rect.right), 
                    width
                ];
                var origin;
                var draw;
                for(var cx = 0; cx < 3; cx++) {
                    for(var cy = 0; cy < 3; cy++) {
                        origin = new pulsar.geom.Rectangle(cols[cx], rows[cy], cols[cx + 1] - cols[cx], rows[cy + 1] - rows[cy]);
                        draw = new pulsar.geom.Rectangle(dCols[cx], dRows[cy], dCols[cx + 1] - dCols[cx], dRows[cy + 1] - dRows[cy]);
                        Scale9.context.drawImage(image, origin.x, origin.y, origin.width, origin.height, draw.x, draw.y, draw.width, draw.height);
                    }
                }
            };
            return Scale9;
        })();        
    })(pulsar.utils || (pulsar.utils = {}));
    var utils = pulsar.utils;
})(pulsar || (pulsar = {}));
