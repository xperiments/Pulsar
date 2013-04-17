
module pulsar.library.binpack
{
	export interface IBinaryBlock
	{

		x:number;
		y:number;
		w:number;
		h:number;
		id?:string;
		data?:any;
		area?:number;
		used?:bool;
		down?:IBinaryBlock;
		right?:IBinaryBlock;
		fit?:IBinaryBlock;

	}

	export class BinaryBlock implements IBinaryBlock
	{
		area:number;
		used:bool;
		down:BinaryBlock;
		right:BinaryBlock;
		fit:BinaryBlock;
		constructor(  public x:number, public y:number, public w:number, public h:number, public data:any, public id:string ){}
	}


	export interface IBinarySort
	{
		(a:IBinaryBlock,b:IBinaryBlock):number;
	}

	export class BinarySortType
	{
		constructor(private value:string){}
		// static sconstructor = (()=>{ return true})();
		public toString(){ return this.value; }

		// values
		public static WIDTH:BinarySortType = new BinarySortType("width");
		public static HEIGHT:BinarySortType = new BinarySortType("height");
		public static MAX_SIDE:BinarySortType = new BinarySortType("maxside");
		public static AREA:BinarySortType = new BinarySortType("area");
	}

	export class BinarySort
	{
		public static w     	(a:IBinaryBlock,b:IBinaryBlock):number { return b.w - a.w; }
		public static h     	(a:IBinaryBlock,b:IBinaryBlock):number { return b.h - a.h; }
		public static a     	(a:IBinaryBlock,b:IBinaryBlock):number { return b.area - a.area; }
		public static max   	(a:IBinaryBlock,b:IBinaryBlock):number { return Math.max(b.w, b.h) - Math.max(a.w, a.h); }
		public static min   	(a:IBinaryBlock,b:IBinaryBlock):number { return Math.min(b.w, b.h) - Math.min(a.w, a.h); }

		public static height	(a:IBinaryBlock,b:IBinaryBlock):number { return msort(a, b, ['h', 'w']);               }
		public static width 	(a:IBinaryBlock,b:IBinaryBlock):number { return msort(a, b, ['w', 'h']);               }
		public static area  	(a:IBinaryBlock,b:IBinaryBlock):number { return msort(a, b, ['a', 'h', 'w']);          }
		public static maxside	(a:IBinaryBlock,b:IBinaryBlock):number { return msort(a, b, ['max', 'min', 'h', 'w']); }

		public static sort( blocks:IBinaryBlock[], sort:string ):void
		{
			if( !sort.match( /(random)|(w)|(h)|(a)|(max)|(min)|(height)|(width)|(area)|(maxside)/ ) ) return;

			blocks.sort(<IBinarySort>(BinarySort[sort]));
		}

		private static msort(a:IBinaryBlock,b:IBinaryBlock, criteria:string[] ):number
		{
			/* sort by multiple criteria */
			var diff:number;
			var n:number;
			var total:number = criteria.length;
			for (n = 0 ; n < total ; n++)
			{
				var sortMethod:IBinarySort = <IBinarySort>BinarySort[criteria[n]];
				diff = sortMethod( a, b );
				if (diff != 0)
				{
					return diff;
				}

			}
			return 0;
		}

	}
	export class BinaryPacker
	{
		public static root:IBinaryBlock;

		public static pack( blocks:IBinaryBlock[] , mode:string ):void
		{
			BinarySort.sort( blocks, mode );
			fit( blocks );
		}
		private static fit(blocks:IBinaryBlock[]):void
		{
			var n:number;
			var node:IBinaryBlock;
			var block:IBinaryBlock;

			var len:number = blocks.length;

			var w:number = len > 0 ? blocks[0].w : 0;
			var h:number = len > 0 ? blocks[0].h : 0;

			BinaryPacker.root = <IBinaryBlock>{
				x: 0,
				y: 0,
				w: w,
				h: h
			};
			for (n = 0; n < len; n++)
			{
				block = blocks[n];
				if (node = findNode(BinaryPacker.root, block.w, block.h))
				{
					block.fit = splitNode(node, block.w, block.h);
				}
				else
				{
					block.fit = growNode(block.w, block.h);
				}
			}
		}

		private static findNode( root:IBinaryBlock, w:number, h:number ):IBinaryBlock
		{
			if (root.used)
			{
				return findNode(root.right, w, h) || findNode(root.down, w, h);
			}
			else
			{
				if ((w <= root.w) && (h <= root.h))
				{
					return root;
				}
				else
				{
					return null;
				}
			}
		}

		private static splitNode (node:IBinaryBlock, w:number, h:number ):IBinaryBlock
		{
			node.used = true;
			node.down = {
				x: node.x,
				y: node.y + h,
				w: node.w,
				h: node.h - h
			};
			node.right = {
				x: node.x + w,
				y: node.y,
				w: node.w - w,
				h: h
			};
			return node;
		}

		private static growNode ( w:number, h:number ):IBinaryBlock
		{
			var canGrowDown:bool = (w <= BinaryPacker.root.w);
			var canGrowRight:bool = (h <= BinaryPacker.root.h);

			var shouldGrowRight:bool = canGrowRight && (BinaryPacker.root.h >= (BinaryPacker.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
			var shouldGrowDown:bool = canGrowDown && (BinaryPacker.root.w >= (BinaryPacker.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

			if (shouldGrowRight)
				return growRight(w, h);
			else if (shouldGrowDown)
				return growDown(w, h);
			else if (canGrowRight)
				return growRight(w, h);
			else if (canGrowDown)
				return growDown(w, h);
			else
				return null; // need to ensure sensible root starting size to avoid this happening
		}

		private static growRight ( w:number, h:number ):IBinaryBlock
		{
			BinaryPacker.root = {
				used: true,
				x: 0,
				y: 0,
				w: BinaryPacker.root.w + w,
				h: BinaryPacker.root.h,
				down: BinaryPacker.root,
				right: {
					x: BinaryPacker.root.w,
					y: 0,
					w: w,
					h: BinaryPacker.root.h
				}
			};
			var node:IBinaryBlock;
			if (node = findNode(BinaryPacker.root, w, h))
			{
				return splitNode(node, w, h);
			}
			else
			{
				return null;
			}
		}

		private static growDown ( w:number, h:number ):IBinaryBlock
		{
			BinaryPacker.root = {
				used: true,
				x: 0,
				y: 0,
				w: BinaryPacker.root.w,
				h: BinaryPacker.root.h + h,
				down: {
					x: 0,
					y: BinaryPacker.root.h,
					w: BinaryPacker.root.w,
					h: h
				},
				right: BinaryPacker.root
			};
			var node:IBinaryBlock;
			if (node = findNode(BinaryPacker.root, w, h))
			{
				return splitNode(node, w, h);
			}
			else
			{
				return null;
			}
		}
	}
}