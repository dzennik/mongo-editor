/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 11.03.12
 * Time: 15:48
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Data.Tree');

MongoEditor.Data.Tree = new Class({
    data: null,
    transformData: null,

    getChildren: function(array, parentId) {
        var result = [];

        jQuery.each(array, function (key, value) {
            if (key === '_id') {
                return;
            }

            var id = MongoEditor.Data.Tree.getId(parentId, key);

            if (typeof value === 'object') {
                var node = {
                    'id'       : id,
                    'key'      : key === 0 ? '0' : key,
                    'value'    : '',
                    'children' : this.getChildren(value, id),
                    'state'    : 'closed'
                }
            } else {
                var node = {
                    'id'    : id,
                    'key'   : key,
                    'value' : value
                }
            }

            result.push(node);
        }.scope(this));

        return result;
    },

    transform: function() {
        return this.transformData = this.getChildren(this.data, 'col');
    },

    initialize: function(data) {
        this.data = data;
    }
});

MongoEditor.Data.Tree.getId = function (parentId, key) {
    return parentId + '-' + key;
}