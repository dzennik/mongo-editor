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

    save: function() {
        this.fireEvent('save');
    },

    new: function() {
        var item = {
            key: 'wegweg',
            value: 13515
        };

        this.fireEvent('new', [item]);
    },

    newArray: function() {
        this.fireEvent('newArray');
    },

    onAfterEdit: function(rowIndex, rowData, changes) {
        switch (rowData.type) {
            case 'array':
                return;
                break;
            case 'value':
                jQuery.each(changes, function (key, value) {
                    rowData.object[rowData.name] = value;
                    rowData.item.value = value;
                });

                this.fireEvent('onAfterEdit', [rowIndex, rowData, changes]);

                break;
        }
    },

    onRowContextMenu: function(e, rowIndex, rowData) {
        this.menu.container.menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        this.menu.rowIndex = rowIndex;
        this.menu.rowData  = rowData;

        return false;
    },

    onDblClickRow: function(rowIndex, rowData) {
        switch (rowData.type) {
            case 'array':
                this.fireEvent('onGoToArray', [rowIndex, rowData]);
                break;
        }

        return false;
    },

    initialize: function(selector, options) {
        this.setOptions(options);

        this.container = jQuery(selector).propertygrid({
            onRowContextMenu: this.onRowContextMenu.scope(this),
            onDblClickRow   : this.onDblClickRow.scope(this),
            onAfterEdit     : this.onAfterEdit.scope(this)
        });

        this.menu = new MongoEditor.Collection.Property.Menu('#property-edit-menu');

        this.menu.addEvent('delete', function(rowIndex, rowData) {
            data = this.container.propertygrid('getData');
            data.rows.removeByElement(rowData);

            this.container.propertygrid('loadData', this.container.propertygrid('getData'));

            this.fireEvent('onAfterEdit', [rowIndex, rowData]);
        }.scope(this));

        this.container.parents('.panel-body').find('.toolbar .button.save').click(this.save.scope(this));
        this.container.parents('.panel-body').find('.toolbar .button.new').click(this.new.scope(this));
        this.container.parents('.panel-body').find('.toolbar .button.new-array').click(this.newArray.scope(this));
    }
});