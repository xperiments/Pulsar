/**
 *
 *	Point class. Direct port of AS3 Rectangle Class
 *
 *	@author		Pedro Casaubon
 *	@version	01.0
 * 	@date       16/04/2014
 * 	@link		http://www.xperiments.es
 *
 */

///<reference path='../../../src/pulsar/geom/Point.ts'/>
module pulsar.geom
{
	export class Rectangle
	{
		/**
		 * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
		 *
		 * @constructor
		 * @param x The x coordinate of the top-left corner of the rectangle.
		 * @param y The y coordinate of the top-left corner of the rectangle.
		 * @param width The width of the rectangle, in pixels.
		 * @param height The height of the rectangle, in pixels.
		 */
		constructor( public x:number = 0,public y:number = 0,public width:number = 0,public height:number = 0){}


		/* getters and setters */

		/**
		 * The sum of the y and height properties.
		 *
		 * @returns {number=}
		 */
		public get bottom():number
		{
			return this.y + this.height;
		}

		/**
		 * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
		 *
		 * @returns {pulsar.geom.Point}
		 */
		public get bottomRight():pulsar.geom.Point
		{
			return new pulsar.geom.Point(this.x + this.width, this.y + this.height);
		}

		/**
		 * The location of the Rectangle object's bottom-right corner, determined by the values of the right and bottom properties.
		 * @param v
		 */
		public set bottomRight(v:pulsar.geom.Point)
		{
			this.width = v.x - this.x;
			this.height = v.y - this.y;
		}

		/**
		 * The x coordinate of the top-left corner of the rectangle.
		 *
		 * @returns {number=}
		 */
		public get left():number
		{
			return this.x;
		}

		/**
		 * The x coordinate of the top-left corner of the rectangle.
		 *
		 * @returns {number=}
		 */
		public set left(value:number)
		{
			this.x = value;
		}

		/**
		 * The sum of the x and width properties.
		 *
		 * @returns {number=}
		 */
		public get right():number
		{
			return this.x + this.width;
		}

		/**
		 * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
		 *
		 * @returns {pulsar.geom.Point}
		 */
		public get size():pulsar.geom.Point
		{
			return new pulsar.geom.Point(this.width, this.height);
		}

		/**
		 * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
		 *
		 * @returns {pulsar.geom.Point}
		 */
		public set size(v:pulsar.geom.Point)
		{
			this.width = v.x;
			this.height = v.y;
		}

		/**
		 * The y coordinate of the top-left corner of the rectangle.
		 *
		 * @returns {number=}
		 */
		public get top():number
		{
			return this.y;
		}
		/**
		 * The y coordinate of the top-left corner of the rectangle.
		 *
		 * @returns {number=}
		 */
		public set top(value:number)
		{
			this.y = value;
		}

		/**
		 * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
		 *
		 * @returns {pulsar.geom.Point}
		 */
		public get topLeft():pulsar.geom.Point
		{
			return new pulsar.geom.Point(this.x, this.y);
		}

		/**
		 * The location of the Rectangle object's top-left corner, determined by the x and y coordinates of the point.
		 *
		 * @param v
		 */
		public set topLeft(v:pulsar.geom.Point)
		{
			this.x = v.x;
			this.y = v.y;
		}



		/* methods */

		/**
		 * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
		 *
		 * @returns {pulsar.geom.Rectangle}
		 */
		public clone()
		{
			return new Rectangle(this.x, this.y, this.width, this.height);
		}

		/**
		 * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
		 *
		 * @param x
		 * @param y
		 * @returns {boolean}
		 */
		public contains(x:number, y:number):bool
		{
			return !!(( this.x <= x && this.y <= y && this.x + this.width > x && this.y + this.height > y));
		}

		/**
		 * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
		 *
		 * @param point
		 * @returns {boolean}
		 */
		public containsPoint( point:pulsar.geom.Point ):bool
		{
			return this.contains(point.x, point.y);
		}

		/**
		 * Determines whether the Rectangle object specified by the rect parameter is contained within this Rectangle object.
		 *
		 * @param rect
		 * @returns {boolean}
		 */
		public containsRect( rect:Rectangle ):bool
		{
			return !!(( this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height));
		}

		/**
		 * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
		 *
		 * @param sourceRect
		 */
		public copyFrom(sourceRect:Rectangle):void
		{
			this.x = sourceRect.x;
			this.y = sourceRect.y;
			this.width = sourceRect.width;
			this.height = sourceRect.height;
		}

		/**
		 * Determines whether the object specified in the toCompare parameter is equal to this Rectangle object.
		 *
		 * @param toCompare
		 * @returns {boolean}
		 */
		public equals( toCompare:Rectangle ):bool
		{
			return !!(( toCompare.x === this.x && toCompare.y === this.y && toCompare.width === this.width && toCompare.height === this.height));
		}

		/**
		 * Increases the size of the Rectangle object by the specified amounts, in pixels.
		 *
		 * @param dx
		 * @param dy
		 */
		public inflate(dx:number, dy:number):void
		{
			this.x -= dx;
			this.width += 2 * dx;
			this.y -= dy;
			this.height += 2 * dy;
		}

		/**
		 * Increases the size of the Rectangle object.
		 *
		 * @param point
		 */
		public inflatePoint(point:pulsar.geom.Point):void
		{
			this.inflate(point.x, point.y);
		}

		/**
		 * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object.
		 *
		 * @param toIntersect
		 * @returns {pulsar.geom.Rectangle}
		 */
		public intersection(toIntersect:Rectangle):Rectangle
		{
			var x1:number = this.x;
			var y1:number = this.y;
			var w1:number = this.width;
			var h1:number = this.height;
			var x2:number = toIntersect.x;
			var y2:number = toIntersect.y;
			var w2:number = toIntersect.width;
			var h2:number = toIntersect.height;

			if (w1 <= 0 || h1 <= 0 || w2 <= 0 || h2 <= 0) { return new Rectangle(0, 0, 0, 0); }

			var l:number = (x1 > x2) ? x1 : x2;
			var r:number = (x1 + w1 < x2 + w2) ? x1 + w1 : x2 + w2;

			if (l >= r) { return new Rectangle(0, 0, 0, 0); }

			var t:number = (y1 > y2) ? y1 : y2;
			var b:number = (y1 + h1 < y2 + h2) ? y1 + h1 : y2 + h2;

			if (t >= b) { return new Rectangle(0, 0, 0, 0); }

			return new Rectangle(l, t, r - l, b - t);
		}

		/**
		 * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
		 *
		 * @param toIntersect
		 * @returns {boolean}
		 */
		public intersects(toIntersect:Rectangle):bool
		{
			var x1:number = this.x;
			var y1:number = this.y;
			var w1:number = this.width;
			var h1:number = this.height;
			var x2:number = toIntersect.x;
			var y2:number = toIntersect.y;
			var w2:number = toIntersect.width;
			var h2:number = toIntersect.height;

			if (w1 <= 0 || h1 <= 0 || w2 <= 0 || h2 <= 0) { return false; }

			return !!((x1 <= x2 + w2 && x2 <= x1 + w1 && y1 <= y2 + h2 && y2 <= y1 + h1));
		}

		/**
		 * Determines whether or not this Rectangle object is empty.
		 *
		 * @returns {boolean}
		 */
		public isEmpty():bool
		{
			return !!((this.width <= 0 || this.height <= 0));
		}

		/**
		 * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
		 *
		 * @param dx
		 * @param dy
		 */
		public offset(dx:number, dy:number):void
		{
			this.x += dx;
			this.y += dy;
		}

		/**
		 * Adjusts the location of the Rectangle object using a Point object as a parameter.
		 *
		 * @param point
		 */
		public offsetPoint(point:pulsar.geom.Point):void
		{
			this.x += point.x;
			this.y += point.y;
		}

		/**
		 * Sets all of the Rectangle object's properties to 0.
 		 */
		public setEmpty():void
		{
			this.x = this.y = this.width = this.height = 0;
		}

		/**
		 * Sets the members of Rectangle to the specified values
		 *
		 * @param xa
		 * @param ya
		 * @param widtha
		 * @param heighta
		 */
		public setTo(xa:number, ya:number, widtha:number, heighta:number):void
		{
			this.x = xa;
			this.y = ya;
			this.width = widtha;
			this.height = heighta;

		}

		/**
		 * Builds and returns a string that lists the horizontal and vertical positions and the width and height of the Rectangle object.
		 *
		 * @returns {string}
		 */
		public toString()
		{
			return '(x=' + this.x + ', y=' + this.y + ', w=' + this.width + ', h=' + this.height + ')';
		};

		/**
		 * Adds two rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two rectangles.
		 * @param toUnion
		 * @returns {pulsar.geom.Rectangle}
		 */
		public union( toUnion:Rectangle ):Rectangle
		{
			var x1:number = this.x;
			var y1:number = this.y;
			var w1:number = this.width;
			var h1:number = this.height;
			var x2:number = toUnion.x;
			var y2:number = toUnion.y;
			var w2:number = toUnion.width;
			var h2:number = toUnion.height;

			if (w1 <= 0 || h1 <= 0) { return toUnion.clone(); }

			if (w2 <= 0 || h2 <= 0) { return this.clone(); }

			var l:number = (x1 < x2) ? x1 : x2;
			var r:number = (x1 + w1 > x2 + w2) ? x1 + w1 : x2 + w2;
			var t:number = (y1 < y2) ? y1 : y2;
			var b:number = (y1 + h1 > y2 + h2) ? y1 + h1 : y2 + h2;

			return new Rectangle(l, t, r - l, b - t);
		}



	}
}