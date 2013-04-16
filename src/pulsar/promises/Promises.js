var pulsar;
(function (pulsar) {
    (function (promises) {
        function when() {
            var promises = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                promises[_i] = arguments[_i + 0];
            }
            var all_done = new Deferred();
            var results = [];
            var remaining = promises.length;
            promises.map(function (p, i) {
                p.then(function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    results[i] = args;
                    remaining--;
                    if(!remaining && all_done.status() !== 'rejected') {
                        all_done.resolve.apply(all_done, results);
                    }
                }, function () {
                    all_done.reject();
                });
            });
            if(!remaining) {
                all_done.resolve.apply(all_done, results);
            }
            return all_done.promise();
        }
        promises.when = when;
        var Promise = (function () {
            function Promise(deferred) {
                this.deferred = deferred;
            }
            Promise.prototype.then = function (callback, error) {
                return this.deferred.then(callback, error);
            };
            Promise.prototype.status = function () {
                return this.deferred.status();
            };
            Promise.prototype.result = function () {
                return this.deferred.result();
            };
            return Promise;
        })();
        promises.Promise = Promise;        
        var Deferred = (function () {
            function Deferred() {
                this.resolved = [];
                this.rejected = [];
                this._promise = new Promise(this);
                this._status = 'in progress';
            }
            Deferred.prototype.promise = function () {
                return this._promise;
            };
            Deferred.prototype.status = function () {
                return this._status;
            };
            Deferred.prototype.result = function () {
                return this._result;
            };
            Deferred.prototype.resolve = function () {
                var result = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    result[_i] = arguments[_i + 0];
                }
                this._result = result;
                this.notify(this.resolved, result);
                this.resolved = [];
                this._status = 'resolved';
                return this;
            };
            Deferred.prototype.reject = function () {
                var result = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    result[_i] = arguments[_i + 0];
                }
                this._result = result;
                this.notify(this.rejected, result);
                this.rejected = [];
                this._status = 'rejected';
                return this;
            };
            Deferred.prototype.then = function (callback, error) {
                var d = new Deferred();
                this.resolved.push(this.wrap(d, callback, 'resolve'));
                this.rejected.push(this.wrap(d, error, 'reject'));
                if(this._status === 'resolved') {
                    this.resolve.apply(this, this.result());
                } else if(this._status === 'rejected') {
                    this.reject.apply(this, this.result());
                }
                return d.promise();
            };
            Deferred.prototype.wrap = function (d, f, method) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    var result = f.apply(f, args);
                    if(result && result instanceof Promise) {
                        result.then(function () {
                            d.resolve();
                        }, function () {
                            d.reject();
                        });
                    } else {
                        d[method].apply(d, (typeof result === 'array') ? result : [
                            result
                        ]);
                    }
                };
            };
            Deferred.prototype.notify = function (funcs, result) {
                funcs.map(function (f) {
                    f.apply(f, result);
                });
            };
            return Deferred;
        })();
        promises.Deferred = Deferred;        
    })(pulsar.promises || (pulsar.promises = {}));
    var promises = pulsar.promises;
})(pulsar || (pulsar = {}));
