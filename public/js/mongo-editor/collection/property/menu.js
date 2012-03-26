/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 25.03.12
 * Time: 15:01
 * To change this template use File | Settings | File Templates.
 */

MongoEditor.Collection.Property.Menu = new Class({
    Implements: [Options, Events],

    rowIndex: null,
    rowData: null,

    delete: function() {
        this.rowData.parent.children.removeByElement(this.rowData.item);

        this.fireEvent('delete', [this.rowIndex, this.rowData]);
    },

    new: function() {
        this.fireEvent('new', [this.rowIndex, this.rowData]);
    },

    newArray: function() {
        this.fireEvent('newArray', [this.rowIndex, this.rowData]);
    },

    onClick: function (item) {
        eval('this.' + jQuery(item.target).attr('rel') + '()');
    },

    initialize: function(selector, options) {
        this.setOptions(options);

        this.container = jQuery(selector).menu({
            onClick: this.onClick.scope(this)
        });
    }
});