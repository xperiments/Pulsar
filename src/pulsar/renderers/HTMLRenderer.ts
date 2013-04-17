///<reference path="../../../src/libs/html2canvas.d.ts"/>
///<reference path="../../../src/libs/pixi.d.ts"/>
///<reference path="../../../src/libs/domready.d.ts"/>
///<reference path='../../../src/pulsar/promises/Promise.ts'/>



module pulsar.renderers
{


	export class HTMLRenderer
	{

		/**
		 * Static main html container
		 */
		private static dummyContainer:HTMLDivElement = null;

		/**
		 * STATIC CONSTRUCTOR HACK
		 * http://typescript.codeplex.com/workitem/862
		 */
		private static CONSTRUCTOR = ( () =>
		{
			domready(()=>{
				HTMLRenderer.dummyContainer = <HTMLDivElement>document.createElement('div');
				HTMLRenderer.dummyContainer.style.backgroundColor = "rgba(0,0,0,0)";
				HTMLRenderer.dummyContainer.style.position ='absolute';
				HTMLRenderer.dummyContainer.style.clip="rect(0px 0px 0px 0px)";
				document.body.appendChild( HTMLRenderer.dummyContainer );
			});

			return null;
		})();


		/**
		 * Dummy element where to place the HTML code we like to render
		 */
		private dummyElement:HTMLDivElement;

		/**
		 * A promise instance used to know when the render has finished
		 */
		private promise:pulsar.promises.Promise;

		/**
		 * Renders the provided html code
		 * @param html Html code to render
		 * @param background Background applied to the rendered element, default is transparent
		 * @param width Width applied to the rendered element, default is element width
		 * @param height Height applied to the rendered element, default is element width
		 * @returns {pulsar.promises.Promise}
		 */

		public renderHTML( html:string, background:string = undefined, width:number = undefined, height:number = undefined ):pulsar.promises.Promise
		{
			this.promise = new pulsar.promises.Promise();

			this.dummyElement = <HTMLDivElement>document.createElement('div');
			this.dummyElement.style.position = "absolute";
			HTMLRenderer.dummyContainer.appendChild( this.dummyElement );
			this.dummyElement.innerHTML = html;
			if (typeof width !== "undefined" && typeof height !== "undefined" )
			{
				this.dummyElement.style.width = width+'px';
				this.dummyElement.style.height = height+'px';
			}
			html2canvas( this.dummyElement,{ onrendered:(canvas:HTMLCanvasElement)=>{ this.onRendered( canvas ) }, background:background });

			return this.promise;
		}

		/**
		 * Renders the provided HTMLElement
		 * @param html HTMLElement to render
		 * @param background Background applied to the HTMLElement, default is transparent
		 * @returns {pulsar.promises.Promise}
		 */
		public renderElement( html:HTMLElement, background:string = undefined ):pulsar.promises.Promise
		{
			this.promise = new pulsar.promises.Promise();
			html2canvas( html, { onrendered:(canvas:HTMLCanvasElement)=>{ this.onRendered( canvas ) }, background:background });
			return this.promise;
		}

		/**
		 * Called when render has finished, receives the rendered canvas element
		 * @param canvas
		 */
		private onRendered( canvas:HTMLCanvasElement ):void
		{
			if( this.dummyElement ) this.dummyElement.parentNode.removeChild(this.dummyElement);
			this.promise.resolve( canvas );
		}




	}
}