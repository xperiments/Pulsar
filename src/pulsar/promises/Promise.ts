/**
 *
 *	Micro Promise implementation.
 *	This is a typescript port of the Promise class found at https://github.com/mozilla/shumway/
 *
 *	@author		Pedro Casaubon
 *	@version	01.0
 * 	@date       16/04/2014
 * 	@link		http://www.xperiments.es
 *
 */



module pulsar.promises
{
	interface IResolve
	{
		promise:Promise;
		itemIndex:number;
	}
	export interface IPromiseCallback
	{
		( result:any ): void;
	}

	export class Promise
	{
		public resolved:bool;
		public value:any;

		private _callbacks:IPromiseCallback[];
		private _values:any[];
		private _resolves:any[];
		private _unresolvedPromises:number;

		constructor()
		{
			this.resolved = false;
			this._callbacks = [];
		}

		public static when():Promise
		{

			var args = arguments[0] instanceof Array ? arguments[0]:arguments;


			var numPromises:number = args.length;
			var promise:Promise = new Promise();
			if (!numPromises)
			{
				promise.resolve();
			}
			else
			{
				var values:any[] = [];
				for (var i:number = 0, n:number = numPromises; i < n; i++)
				{
					var item:Promise = <Promise>args[i];
					if (item.resolved )
					{
						values[i] = item.value;
						--numPromises;
						continue;
					}
					// maintain dependencies between promises, see Promise.when
					var resolves:IResolve[] = item._resolves || (item._resolves = []);
					resolves.push(<IResolve>{promise: promise, itemIndex: i});
				}

				if (numPromises > 0)
				{
					promise._values = values;
					promise._unresolvedPromises = numPromises;
				}
				else
				{
					promise.resolve(values);
				}
			}
			return promise;
		};


		public resolve( result?:any ):void
		{
			if (this.resolved) return;

			this.resolved = true;
			this.value = result;

			var callbacks:IPromiseCallback[] = this._callbacks;
			for (var i:number = 0, n:number = callbacks.length; i < n; i++)
			{
				var cb:IPromiseCallback = callbacks[i];
				cb( result );
			}

			var resolves:IResolve[] = this._resolves;
			if (!resolves) return;

			// this promise can resolve more group promises
			// collecting all resolved promises, so we can call
			// the callbacks later
			var resolvedPromises:Promise[] = [];
			var queue:any[] = [];
			for (var i:number = 0; i < resolves.length; i++)
			{
				if (!resolves[i].promise.resolved) queue.push(resolves[i], result);
			}
			while (queue.length > 0)
			{
				var item:IResolve = queue.shift();
				var itemResult:any = queue.shift();
				var itemPromise:Promise = item.promise;
				var itemIndex:number = item.itemIndex;
				itemPromise._values[itemIndex] = itemResult;
				if (!--itemPromise._unresolvedPromises)
				{
					// all promises resolved in the group
					itemPromise.resolved = true;
					itemPromise.value = itemPromise._values;
					delete itemPromise._values;
					resolvedPromises.push(itemPromise);

					resolves = itemPromise._resolves;
					if (resolves)
					{
						// checking if more group promises can be resolved
						for (var i = 0; i < resolves.length; i++)
						{
							if (!resolves[i].promise.resolved) queue.push(resolves[i], itemPromise.value);
						}
					}
				}
			}
			// invokes callbacks for all resolved promises
			while (resolvedPromises.length > 0)
			{
				var itemPromise:Promise = resolvedPromises.shift();
				var callbacks:IPromiseCallback[] = itemPromise._callbacks;
				for (var i:number = 0, n:number = callbacks.length; i < n; i++)
				{
					var cb:IPromiseCallback = callbacks[i];
					cb(itemPromise.value);
				}
			}
		};

		public then( callback:IPromiseCallback ):void
		{
			if (this.resolved)
			{
				callback(this.value);
			}
			else
			{
				this._callbacks.push(callback);
			}
		};
	}




}