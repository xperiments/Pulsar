var pulsar;
(function (pulsar) {
    (function (utils) {
        (function (MathUtils) {
            function getNextPowerOfTwo(num) {
                if(num > 0 && (num & (num - 1)) == 0) {
                    return num;
                } else {
                    var result = 1;
                    while(result < num) {
                        result <<= 1;
                    }
                    return result;
                }
            }
            MathUtils.getNextPowerOfTwo = getNextPowerOfTwo;
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            MathUtils.getRandomInt = getRandomInt;
        })(utils.MathUtils || (utils.MathUtils = {}));
        var MathUtils = utils.MathUtils;
    })(pulsar.utils || (pulsar.utils = {}));
    var utils = pulsar.utils;
})(pulsar || (pulsar = {}));
