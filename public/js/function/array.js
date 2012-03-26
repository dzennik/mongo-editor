/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 25.03.12
 * Time: 15:52
 * To change this template use File | Settings | File Templates.
 */

Array.prototype.removeByElement = function(el) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === el) {
            this.splice(i, 1);
        }
    }
}

Array.prototype.merge = function(source) {
    jQuery.each(source, function (item) {
        if (typeof item === 'object') {
            item.merge();
        } else {

        }
    });
}

var a = [
    {
        a: 1,
        b: {
            b1: 2,
            b2: 3
        }
    }, {
        c: 1
    }
];

var b = [
    {
        a: 1,
        b: {
            b1: 2,
            b2: 3,
            b3: 435
        }
    }, {
        c: 1
    }
];

a.merge(b);