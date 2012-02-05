/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 07.01.12
 * Time: 23:10
 * To change this template use File | Settings | File Templates.
 */

(function($){
    var isExist = function() {
        var isExist = true;
        if (arguments.length > 0) {
            $.each(arguments, function (index, arg) {
               if (typeof arg === 'undefined' || arg === null) {
                   isExist = false;
                   return false;
               }
            });
        }

        return isExist;
    }

    $.namespace = function(namespace) {
        var names = namespace.split('.');
        var current = window;

        $.each(names, function (index, name) {
            if (!isExist(current[name])) {
                current[name] = {};
            }

            current = current[name];
        })
    }
})(jQuery);