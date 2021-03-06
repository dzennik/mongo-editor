/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 09.04.12
 * Time: 22:34
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Data.Tree');

MongoEditor.Data.Tree = new Class({
    data: null,
    transformData: null,

    getChildren: function(array, parentId) {
        var result = [];

        jQuery.each(array, function (key, value) {
            var id = MongoEditor.Data.Tree.getId(parentId, key);

            if (typeof value === 'object') {
                var node = {
                    'id'       : id,
                    'text'     : key === 0 ? '0' : key,
                    'children' : this.getChildren(value, id),
                    'state'    : 'closed'
                }
            } else {
                var node = {
                    'id'    : id,
                    'text'  : value,
                    'state' : 'open'
                }
            }

            result.push(node);
        }.scope(this));

        return result;
    },

    transform: function() {
        return this.transformData = this.getChildren(this.data, 'tree');
    },

    initialize: function(data) {
        this.data = data;
    }
});

MongoEditor.Data.Tree.getId = function (parentId, key) {
    return parentId + '-' + key;
}