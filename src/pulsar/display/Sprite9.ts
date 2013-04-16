///<reference path='../../../src/libs/pixi.d.ts'/>
///<reference path='../../../src/pulsar/geom/Rectangle.ts'/>
module pulsar.display
{
	export class Sprite9 extends PIXI.DisplayObjectContainer
	{

		private scale9Sprites:PIXI.Sprite[];
		private static ZERO_POINT:PIXI.Point = new PIXI.Point(0,0);
		private static ZERO_RECT:pulsar.geom.Rectangle = new pulsar.geom.Rectangle(0,0,100,100);

		public cacheAsBitmap:bool = false;
		private _size:PIXI.Point;

		constructor( public texture:PIXI.Texture, size:PIXI.Point = Sprite9.ZERO_POINT, public scale9Grid:pulsar.geom.Rectangle = Sprite9.ZERO_RECT )
		{
			super();

			this.scale9Sprites = [];

			var cols : any[] = [0, scale9Grid.left, scale9Grid.right, texture.baseTexture.width];
			var rows : any[] = [0, scale9Grid.top, scale9Grid.bottom, texture.baseTexture.height];



			var origin : PIXI.Rectangle;
			var textureCount:number = 0;
			for (var cx : number = 0;cx < 3; cx++)
			{
				for (var cy : number = 0 ;cy < 3; cy++)
				{
					origin = new PIXI.Rectangle(cols[cx], rows[cy], Math.abs( cols[cx + 1] - cols[cx] ), Math.abs( rows[cy + 1] - rows[cy] ) );
					this.scale9Sprites[ textureCount ] = new PIXI.Sprite( new PIXI.Texture( texture.baseTexture, origin ) );
					this.addChild(this.scale9Sprites[ textureCount ]);

					textureCount++;
				}
			}
			this.setSize( size );
		}

		setSize( size:PIXI.Point ):void
		{


			var draw : PIXI.Rectangle;
			var origin : PIXI.Rectangle;
			var textureCount:number = 0;


			var cols : any[] = [0, this.scale9Grid.left, this.scale9Grid.right, this.texture.baseTexture.width];
			var rows : any[] = [0, this.scale9Grid.top, this.scale9Grid.bottom, this.texture.baseTexture.height];
			var dRows : any[] = [0, this.scale9Grid.top, size.y - ( this.texture.baseTexture.height - this.scale9Grid.bottom ), size.y];
			var dCols : any[] = [0, this.scale9Grid.left, size.x - ( this.texture.baseTexture.width - this.scale9Grid.right ), size.x];

			for (var cx : number = 0;cx < 3; cx++)
			{
				for (var cy : number = 0 ;cy < 3; cy++)
				{
					origin = new PIXI.Rectangle(cols[cx], rows[cy], Math.abs( cols[cx + 1] - cols[cx] ), Math.abs( rows[cy + 1] - rows[cy] ) );
					draw = new PIXI.Rectangle(dCols[cx], dRows[cy],  Math.abs( dCols[cx + 1] - dCols[cx] ),  Math.abs( dRows[cy + 1] - dRows[cy] ) );
					this.scale9Sprites[ textureCount ].position.x =  draw.x;
					this.scale9Sprites[ textureCount ].position.y =  draw.y;

					if( !( textureCount == 0 || textureCount == 2 || textureCount == 6 || textureCount == 8) )
					{
						this.scale9Sprites[ textureCount ].scale.x = origin.width/draw.width;
						this.scale9Sprites[ textureCount ].scale.y = origin.height/draw.height;
					}
					textureCount++;
				}
			}
		}




	}
}