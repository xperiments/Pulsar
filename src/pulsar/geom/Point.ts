/**
 *
 *	Point class. Direct port of AS3 Point Class
 *
 *	@author		Pedro Casaubon
 *	@version	01.0
 * 	@date       16/04/2014
 * 	@link		http://www.xperiments.es
 *
 */

module pulsar.geom
{

	export class Point
	{
		/**
		 * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
		 *
		 * @constructor
		 * @param x The horizontal coordinate of the point.
		 * @param y The vertical coordinate of the point.
		 */
		constructor(public x:number = 0, public y:number = 0){}


		/**
		 * Adds the coordinates of another point to the coordinates of this point to create a new point.
		 * @param p
		 * @returns {Point}
		 */
		public add(p:Point):Point
		{
			return new Point((this.x+p.x), (this.y+p.y));
		}

		/**
		 * Creates a copy of this Point object.
		 *
		 * @returns {Point}
		 */
		public clone():Point
		{
			return new Point(this.x, this.y);
		}

		/**
		 * Returns the distance between pt1 and pt2.
		 *
		 * @static
		 * @param pt1
		 * @param pt2
		 * @returns {number}
		 */
		public static distance(pt1:Point, pt2:Point ):number
		{
			var dx:number = pt2.x - pt1.x;
			var dy:number = pt2.y - pt1.y;
			return Math.sqrt(dx * dx + dy * dy);
		}

		/**
		 * Determines whether two points are equal.
		 *
		 * @param toCompare
		 * @returns {boolean}
		 */
		public equals( toCompare:Point ):bool
		{
			return (toCompare.x === this.x && toCompare.y === this.y) ? true : false;
		}

		/**
		 * [static] Determines a point between two specified points.
		 *
		 * @param pt1
		 * @param pt2
		 * @param f
		 * @returns {Point}
		 */
		public static interpolate(pt1:Point, pt2:Point, f:number ):Point
		{
			return new Point(f * pt1.x + (1 - f) * pt2.x, f * pt1.y + (1 - f) * pt2.y);
		}

		/**
		 * The length of the line segment from (0,0) to this point.
		 *
		 * @returns {number}
		 */
		get length():number
		{
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}

		/**
		 * Scales the line segment between (0,0) and the current point to a set length.
		 *
		 * @param thickness
		 * @returns {Point}
		 */
		public normalize( thickness:number ):Point
		{
			var x:number = this.x;
			var y:number = this.y;
			var l:number = this.length;
			if (l > 0) {
				var f = this.length / l;
				x *= f;
				y *= f;
			}
			return new Point(x, y);
		};

		/**
		 * Offsets the Point object by the specified amount.
		 *
		 * @param dx
		 * @param dy
		 * @returns {Point}
		 */
		public offset(dx:number, dy:number):Point
		{
			return new Point(this.x + dx, this.y + dy);
		}

		/**
		 * Converts a pair of polar coordinates to a Cartesian point coordinate.
		 *
		 * @static
		 * @param len
		 * @param angle
		 * @returns {Point}
		 */
		public static polar(len:number, angle:number):Point
		{
			return new Point(len * Math.cos(angle), len * Math.sin(angle));
		}

		/**
		 * Sets the members of Point to the specified values
		 *
		 * @param xa
		 * @param ya
		 */
		public setTo(xa : number, ya : number) : void
		{
			this.x = xa;
			this.y = ya;
		}

		/**
		 * Subtracts the coordinates of another point from the coordinates of this point to create a new point.
		 *
		 * @param v
		 * @returns {Point}
		 */
		public subtract(v:Point):Point
		{
			return new Point(this.x - v.x, this.y - v.y);
		}

		/**
		 * Returns a string that contains the values of the x and y coordinates.
		 *
		 * @returns {string}
		 */
		public toString():string
		{
			return '(x=' + this.x + ', y=' + this.y + ')';
		}
	}
}