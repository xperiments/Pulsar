/**
 *
 *	Bitmap9 class. An implementation of the scale9grid from AS3
 *
 *	@author		Pedro Casaubon
 *	@version	01.0
 * 	@date       16/04/2014
 * 	@link		http://www.xperiments.es
 *
 */

///<reference path='../../../src/pulsar/geom/Rectangle.ts'/>
module pulsar.display
{
	export class Bitmap9
	{
		/**
		 * A static canvas used to draw the resulting scale9 image
		 * @type {HTMLCanvasElement}
		 */
		private static canvas:HTMLCanvasElement = <HTMLCanvasElement>document.createElement('canvas');

		/**
		 * A static reference to our drawing canvas
		 * @type {CanvasRenderingContext2D}
		 */
		private static context:CanvasRenderingContext2D = <CanvasRenderingContext2D>Bitmap9.canvas.getContext('2d');


		/**
		 * Renders an image from a scale9 base texture
		 * @param image The original scale9 texture
		 * @param scale9Grid  Rectangle representing the scale9 corners
		 * @param width Width of the resulting scaled image
		 * @param height Height of the resulting scaled image
		 * @returns {HTMLImageElement}
		 */
		public static render( image:HTMLImageElement, scale9Grid:pulsar.geom.Rectangle, width:number = 100, height:number = 100 ):HTMLImageElement
		{
			// clear canvas
			context.clearRect(0,0,canvas.width,canvas.height);

			// assign new dimensions to the canvas
			canvas.width = width;
			canvas.height = height;

			// define bitmap source areas
			var rows : number[] = [0, scale9Grid.top, scale9Grid.bottom, image.height];
			var cols : number[] = [0, scale9Grid.left, scale9Grid.right, image.width];

			// define bitmap destination areas
			var dRows : number[] = [0, scale9Grid.top, height - ( image.height - scale9Grid.bottom ), height];
			var dCols : number[] = [0, scale9Grid.left, width - ( image.width - scale9Grid.right ), width];

			// rectangle containing current origin area
			var origin : pulsar.geom.Rectangle;

			// rectangle containing current destination area
			var draw : pulsar.geom.Rectangle;


			for (var cx : number = 0;cx < 3; cx++)
			{
				for (var cy : number = 0 ;cy < 3; cy++)
				{
					// compute current origin and draw area Rectangles
					origin = new pulsar.geom.Rectangle(cols[cx], rows[cy], cols[cx + 1] - cols[cx], rows[cy + 1] - rows[cy]);
					draw = new pulsar.geom.Rectangle(dCols[cx], dRows[cy], dCols[cx + 1] - dCols[cx], dRows[cy + 1] - dRows[cy]);

					// draw the image portion
					context.drawImage( image, origin.x, origin.y, origin.width, origin.height,draw.x, draw.y, draw.width, draw.height );
				}
			}

			// Create & return a new image that holds the resulting bitmap
			var resultImage:HTMLImageElement = new Image();
				resultImage.src = canvas.toDataURL();
			return resultImage;

		}
	}
}
