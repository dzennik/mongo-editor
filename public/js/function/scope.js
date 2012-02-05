/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 08.01.12
 * Time: 0:28
 * To change this template use File | Settings | File Templates.
 */

Function.prototype.scope = function(context) {
    var fun = this;
    return function(){
        return fun.apply(context, arguments);
    };
};