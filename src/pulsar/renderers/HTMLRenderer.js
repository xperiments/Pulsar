var pulsar;
(function (pulsar) {
    (function (renderers) {
        var HTMLRenderer = (function () {
            function HTMLRenderer() { }
            HTMLRenderer.dummyContainer = null;
            HTMLRenderer.CONSTRUCTOR = (function () {
                domready(function () {
                    HTMLRenderer.dummyContainer = document.createElement('div');
                    HTMLRenderer.dummyContainer.style.backgroundColor = "rgba(0,0,0,0)";
                    HTMLRenderer.dummyContainer.style.position = 'absolute';
                    HTMLRenderer.dummyContainer.style.clip = "rect(0px 0px 0px 0px)";
                    document.body.appendChild(HTMLRenderer.dummyContainer);
                });
                return null;
            })();
            HTMLRenderer.prototype.renderHTML = function (html, background, width, height) {
                if (typeof background === "undefined") { background = undefined; }
                if (typeof width === "undefined") { width = undefined; }
                if (typeof height === "undefined") { height = undefined; }
                var _this = this;
                this.promise = new pulsar.promises.Promise();
                this.dummyElement = document.createElement('div');
                this.dummyElement.style.position = "absolute";
                HTMLRenderer.dummyContainer.appendChild(this.dummyElement);
                this.dummyElement.innerHTML = html;
                if(typeof width !== "undefined" && typeof height !== "undefined") {
                    this.dummyElement.style.width = width + 'px';
                    this.dummyElement.style.height = height + 'px';
                }
                html2canvas(this.dummyElement, {
                    onrendered: function (canvas) {
                        _this.onRendered(canvas);
                    },
                    background: background
                });
                return this.promise;
            };
            HTMLRenderer.prototype.renderElement = function (html, background) {
                if (typeof background === "undefined") { background = undefined; }
                var _this = this;
                this.promise = new pulsar.promises.Promise();
                html2canvas(html, {
                    onrendered: function (canvas) {
                        _this.onRendered(canvas);
                    },
                    background: background
                });
                return this.promise;
            };
            HTMLRenderer.prototype.onRendered = function (canvas) {
                if(this.dummyElement) {
                    this.dummyElement.parentNode.removeChild(this.dummyElement);
                }
                this.promise.resolve(canvas);
            };
            return HTMLRenderer;
        })();
        renderers.HTMLRenderer = HTMLRenderer;        
    })(pulsar.renderers || (pulsar.renderers = {}));
    var renderers = pulsar.renderers;
})(pulsar || (pulsar = {}));
