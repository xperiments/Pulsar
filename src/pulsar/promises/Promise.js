var pulsar;
(function (pulsar) {
    (function (promises) {
        var Promise = (function () {
            function Promise() {
                this.resolved = false;
                this._callbacks = [];
            }
            Promise.when = function when() {
                var args = arguments[0] instanceof Array ? arguments[0] : arguments;
                var numPromises = args.length;
                var promise = new Promise();
                if(!numPromises) {
                    promise.resolve();
                } else {
                    var values = [];
                    for(var i = 0, n = numPromises; i < n; i++) {
                        var item = args[i];
                        if(item.resolved) {
                            values[i] = item.value;
                            --numPromises;
                            continue;
                        }
                        var resolves = item._resolves || (item._resolves = []);
                        resolves.push({
                            promise: promise,
                            itemIndex: i
                        });
                    }
                    if(numPromises > 0) {
                        promise._values = values;
                        promise._unresolvedPromises = numPromises;
                    } else {
                        promise.resolve(values);
                    }
                }
                return promise;
            };
            Promise.prototype.resolve = function (result) {
                if(this.resolved) {
                    return;
                }
                this.resolved = true;
                this.value = result;
                var callbacks = this._callbacks;
                for(var i = 0, n = callbacks.length; i < n; i++) {
                    var cb = callbacks[i];
                    cb(result);
                }
                var resolves = this._resolves;
                if(!resolves) {
                    return;
                }
                var resolvedPromises = [];
                var queue = [];
                for(var i = 0; i < resolves.length; i++) {
                    if(!resolves[i].promise.resolved) {
                        queue.push(resolves[i], result);
                    }
                }
                while(queue.length > 0) {
                    var item = queue.shift();
                    var itemResult = queue.shift();
                    var itemPromise = item.promise;
                    var itemIndex = item.itemIndex;
                    itemPromise._values[itemIndex] = itemResult;
                    if(!--itemPromise._unresolvedPromises) {
                        itemPromise.resolved = true;
                        itemPromise.value = itemPromise._values;
                        delete itemPromise._values;
                        resolvedPromises.push(itemPromise);
                        resolves = itemPromise._resolves;
                        if(resolves) {
                            for(var i = 0; i < resolves.length; i++) {
                                if(!resolves[i].promise.resolved) {
                                    queue.push(resolves[i], itemPromise.value);
                                }
                            }
                        }
                    }
                }
                while(resolvedPromises.length > 0) {
                    var itemPromise = resolvedPromises.shift();
                    var callbacks = itemPromise._callbacks;
                    for(var i = 0, n = callbacks.length; i < n; i++) {
                        var cb = callbacks[i];
                        cb(itemPromise.value);
                    }
                }
            };
            Promise.prototype.then = function (callback) {
                if(this.resolved) {
                    callback(this.value);
                } else {
                    this._callbacks.push(callback);
                }
            };
            return Promise;
        })();
        promises.Promise = Promise;        
    })(pulsar.promises || (pulsar.promises = {}));
    var promises = pulsar.promises;
})(pulsar || (pulsar = {}));
