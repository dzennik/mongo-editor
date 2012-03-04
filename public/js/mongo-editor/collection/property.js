/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 08.01.12
 * Time: 20:10
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Collection.Property');

MongoEditor.Collection.Property = new Class({
    Implements: [Options, Events],

    onDblClickRow: function (rowIndex, rowData) {
        if (rowData.type) {
            switch (rowData.type) {
                case 'array':
                    this.fireEvent('onGoToArray', [rowIndex, rowData]);
                    break;
            }
        }

        return false;
    },

    initialize: function(selector, options){
        this.setOptions(options);

        this.container = jQuery(selector).propertygrid({
            onDblClickRow: this.onDblClickRow.scope(this)
        });
    }
});