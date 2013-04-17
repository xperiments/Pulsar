///<reference path="../../../src/libs/html2canvas.d.ts"/>
///<reference path="../../../src/libs/pixi.d.ts"/>
///<reference path='../../../src/pulsar/promises/Promises.ts'/>



module pulsar.renderers
{

	export class TextField
	{

		/* STATIC */
		private static dummyContainer:HTMLDivElement = <HTMLDivElement>document.createElement('div');
		private static initialized:bool = false;
		private static checkInit()
		{
			if(!TextField.initialized )
			{
				TextField.dummyContainer.style.position ='absolute';
				TextField.dummyContainer.style.left ='9999px';
				TextField.initialized = true;
				document.body.appendChild( TextField.dummyContainer )
			}
		}

		/* MEMBER */
		private dummyElement:HTMLElement;
		private promise:pulsar.promises.Deferred;

		public render( text:string, classs:string, width:number = 100, height:number=100 ):pulsar.promises.Promise
		{

			TextField.checkInit();
			this.dummyElement = document.createElement('div');
			TextField.dummyContainer.appendChild( this.dummyElement );

			this.dummyElement.innerHTML = '<div class="'+classs+'">'+text+'</div>';
			this.dummyElement.style.width = width+'px';
			this.dummyElement.style.height = height+'px';

			this.promise = new pulsar.promises.Deferred();

			html2canvas( this.dummyElement,{ onrendered:(canvas:HTMLCanvasElement)=>{ this.onrendered( canvas ) }});
			return this.promise.promise();
		}

		public onrendered( canvas:HTMLCanvasElement ):void
		{

			this.dummyElement.parentNode.removeChild(this.dummyElement);
			this.promise.resolve( canvas );
		}




	}
}