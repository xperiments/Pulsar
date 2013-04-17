module pulsar.promises {
    interface IPromiseCallback {
        (result: any): void;
    }
    class Promise {
        public resolved: bool;
        public value: any;
        private _callbacks;
        private _values;
        private _resolves;
        private _unresolvedPromises;
        constructor();
        static when(): Promise;
        public resolve(result?: any): void;
        public then(callback: IPromiseCallback): void;
    }
}
