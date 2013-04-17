/// <reference path="../../../src/libs/html2canvas.d.ts" />
/// <reference path="../../../src/libs/pixi.d.ts" />
/// <reference path="../../../src/libs/domready.d.ts" />
/// <reference path="../../../src/pulsar/promises/Promise.d.ts" />
module pulsar.renderers {
    class HTMLRenderer {
        private static dummyContainer;
        private static CONSTRUCTOR;
        private dummyElement;
        private promise;
        public renderHTML(html: string, background?: string, width?: number, height?: number): promises.Promise;
        public renderElement(html: HTMLElement, background?: string): promises.Promise;
        private onRendered(canvas);
    }
}
