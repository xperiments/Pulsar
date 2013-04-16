var pulsar;
(function (pulsar) {
    (function (renderers) {
        var TextField = (function () {
            function TextField() { }
            TextField.dummyContainer = document.createElement('div');
            TextField.initialized = false;
            TextField.checkInit = function checkInit() {
                if(!TextField.initialized) {
                    TextField.dummyContainer.style.position = 'absolute';
                    TextField.dummyContainer.style.left = '9999px';
                    TextField.initialized = true;
                    document.body.appendChild(TextField.dummyContainer);
                }
            };
            TextField.prototype.render = function (text, classs, width, height) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 100; }
                var _this = this;
                TextField.checkInit();
                this.dummyElement = document.createElement('div');
                TextField.dummyContainer.appendChild(this.dummyElement);
                this.dummyElement.innerHTML = '<div class="' + classs + '">' + text + '</div>';
                this.dummyElement.style.width = width + 'px';
                this.dummyElement.style.height = height + 'px';
                this.promise = new pulsar.utils.promises.Deferred();
                html2canvas(this.dummyElement, {
                    onrendered: function (canvas) {
                        _this.onrendered(canvas);
                    }
                });
                return this.promise.promise();
            };
            TextField.prototype.onrendered = function (canvas) {
                this.dummyElement.parentNode.removeChild(this.dummyElement);
                this.promise.resolve(canvas);
            };
            return TextField;
        })();
        renderers.TextField = TextField;        
    })(pulsar.renderers || (pulsar.renderers = {}));
    var renderers = pulsar.renderers;
})(pulsar || (pulsar = {}));
