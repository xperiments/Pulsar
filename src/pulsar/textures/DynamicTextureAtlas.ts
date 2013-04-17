///<reference path='../../../src/libs/pixi.d.ts'/>
///<reference path='../../../src/pulsar/textures/BinaryPacker.ts'/>
///<reference path='../../../src/pulsar/utils/MathUtils.ts'/>



module pulsar.textures
{


	export interface TextureAtlas
	{
		[s: string]: TextureAtlasElement;
	}

	export interface TextureAtlasElement
	{
		frame: TextureAtlasFrame;
		rotated:bool;
		trimmed:bool;
		spriteSourceSize:TextureAtlasFrame;
		sourceSize:TextureAtlasSourceSize;
	}

	export interface TextureAtlasFrame
	{
		x:number;
		y:number;
		w:number;
		h:number;
	}

	export interface TextureAtlasSourceSize
	{
		w:number;
		h:number;
	}

	export class DynamicTextureAtlas
	{
		//static BinaryBlock: { new( x:number, y:number, w:number, h:number, data:any, id:string ): pulsar.library.binpack.BinaryBlock; };

		private static LIBS:DynamicTextureAtlas[] = [];
		public static getLibrary( id:string ):DynamicTextureAtlas
		{
			return DynamicTextureAtlas.LIBS[ id ];
		}


		/**
		 * Contains the blocks used in the Binary Packing
		 * @type {Array}
		 */
		private blocks:pulsar.library.binpack.IBinaryBlock[] = [];

		/**
		 * Contains the Canvas context
		 */
		private context:CanvasRenderingContext2D;

		/**
		 * Contains the resulting Canvas Element that holds our texture
		 */
		public canvas:HTMLCanvasElement;

		/**
		 * The resulting PIXI.BaseTexture
		 */
		public texture:PIXI.BaseTexture;

		/**
		 * The resulting Texture Atlas
		 */
		public textureAtlas:TextureAtlas;

		/**
		 * Creates a new DynamicTextureAtlas
		 * @param uid A unique identifier for use with DynamicTextureAtlas.getLibrary method
		 * @param shapePadding The padding value that is appened to each Image Block
		 */
		constructor( public uid:string, public shapePadding:number = 2 )
		{

			DynamicTextureAtlas.LIBS[ uid ] = this;

			// Create the Canvas&Context
			this.canvas = <HTMLCanvasElement>document.createElement('canvas');
			this.context =  this.canvas.getContext('2d');

		}

		/**
		 * Add an element to the DynamicTextureAtlas
		 * @param id The id that will be used to identify the element in the json SpriteAtlas
		 * @param image
		 */
		public add( id:string, image:HTMLElement ):void
		{
			var block:pulsar.library.binpack.BinaryBlock;
			var shapePadding2x:number = this.shapePadding*2;
			if( image instanceof HTMLImageElement )
			{
				block = new pulsar.library.binpack.BinaryBlock
				(
					this.shapePadding,
					this.shapePadding,
					(<HTMLImageElement>image).width+shapePadding2x,
					(<HTMLImageElement>image).height+shapePadding2x,
					image,
					id
				);

			}
			else if( image instanceof HTMLCanvasElement )
			{
				block = new pulsar.library.binpack.BinaryBlock
				(
					this.shapePadding,
					this.shapePadding,
					(<HTMLCanvasElement>image).width+shapePadding2x,
					(<HTMLCanvasElement>image).height+shapePadding2x,
					image,
					id
				);
			}
			else
			{
				throw "Image element must be Canvas or Image";
			}

			this.blocks.push( block );
		}

		/**
		 *
		 * @param id
		 * @param dataURL
		 */
		private addFromDataURL(  id:string, dataURL:string )
		{
			var image:HTMLImageElement = new Image();
				image.src = dataURL;

			this.blocks.push( new pulsar.library.binpack.BinaryBlock(0,0,image.width, image.height, image,  id ) );
		}

		/**
		 * Packs all block elements and generates the BaseTexture & TextureAtlas
		 * @param mode
		 */
		public render( mode:pulsar.library.binpack.BinarySortType = pulsar.library.binpack.BinarySortType.MAX_SIDE ):void
		{
			var i:number;
			var t:string;
			var total:number;

			// Packs & Order the image blocks
			pulsar.library.binpack.BinaryPacker.pack(this.blocks, mode.toString() );

			this.canvas.width = pulsar.utils.MathUtils.getNextPowerOfTwo( pulsar.library.binpack.BinaryPacker.root.w );
			this.canvas.height = pulsar.utils.MathUtils.getNextPowerOfTwo( pulsar.library.binpack.BinaryPacker.root.h );

			var textureAtlas:TextureAtlas = {};
			for( i=0, total = this.blocks.length; i<total; i++ )
			{
				var cur:pulsar.library.binpack.IBinaryBlock = this.blocks[i];

				// create Atlas Element
				textureAtlas[ this.uid+'.'+cur.id ] = <TextureAtlasElement>
				{
					frame: 				<TextureAtlasFrame>{ x:cur.fit.x+this.shapePadding, y:cur.fit.y+this.shapePadding, w:cur.fit.w, h:cur.fit.h },
					rotated:			false,
					trimmed:			false,
					spriteSourceSize:	<TextureAtlasFrame>{ x:cur.fit.x+this.shapePadding, y:cur.fit.y+this.shapePadding, w:cur.fit.w, h:cur.fit.h },
					sourceSize:			<TextureAtlasSourceSize>{ w:cur.fit.w, h:cur.fit.h}
				}

				// draw image to canvas
				this.context.drawImage(cur.data, cur.fit.x+this.shapePadding, cur.fit.y+this.shapePadding );

			}

			// create texture from resulting canvas
			this.texture = new PIXI.BaseTexture( this.canvas );
			this.textureAtlas = textureAtlas;

			for ( t in textureAtlas)
			{
				var rect:TextureAtlasFrame = textureAtlas[t].frame;

				if (rect)
				{
					PIXI.TextureCache[ t ] = new PIXI.Texture( this.texture, <PIXI.Rectangle>{x:rect.x, y:rect.y, width:rect.w, height:rect.h});

					if(textureAtlas[ t ].trimmed)
					{
						PIXI.TextureCache[ t ].realSize = textureAtlas[t].spriteSourceSize;
						PIXI.TextureCache[ t ].trim.x = 0;

					}
				}
			}

			// Free blocks as it contains image references
			this.blocks = null;

			// Force PIXI to update texture cache for this textxure
			PIXI.texturesToUpdate.push( this.texture );




		}

	}
}