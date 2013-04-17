module pulsar.utils.MathUtils
{

	/**
	 * Returns the next power of two that is equal to or bigger than the specified num.
	 * @param num
	 * @returns {number}
	 */
	export function getNextPowerOfTwo( num:number ):number
	{
		if (num > 0 && (num & (num - 1)) == 0)
		{
			return num;
		}
		else
		{
			var result:number = 1;
			while (result < num) result <<= 1;
			return result;
		}
	}

	export function getRandomInt (min:number, max:number):number
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}