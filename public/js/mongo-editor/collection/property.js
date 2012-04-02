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

    set: function(formData) {
        console.log(formData.row.item);

        formData.row.item.key   = formData.name;
        formData.row.item.value = formData.value;

        formData.row.name  = formData.name;
        formData.row.value = formData.value;

        formData.row.object[formData.name] = formData.value;

        this.fireEvent('onAfterEdit', [0, formData, formData]);

        this.reload();
    },

    edit: function(row) {
        var formData = {
            row  : row,
            name : row.name,
            value: row.value,
            type : row.type
        };

        this.editDialog.open(formData);

        this.fireEvent('edit');
    },

    delete: function(row) {
        this.fireEvent('delete', [row]);
    },

    new: function() {
        var item = {
            key: 'TEST RECORD',
            value: 13515
        };

        this.fireEvent('new', [item]);
    },

    newArray: function() {
        var item = {
            key: 'newARRAY'
        };

        this.fireEvent('newArray', [item]);
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

        this.menu = new MongoEditor.Collection.Property.Menu('#property-edit-menu');

        this.menu.addEvent('edit', function () {
            this.menu.rowIndex = this.menu.selected[1]; // rowIndex from onRowContextMenu event of container
            this.menu.rowData  = this.menu.selected[2]; // rowData from onRowContextMenu event of container

            this.edit(this.menu.rowData);
        }.scope(this));

        this.menu.addEvent('delete', function () {
            this.menu.rowIndex = this.menu.selected[1]; // rowIndex from onRowContextMenu event of container
            this.menu.rowData  = this.menu.selected[2]; // rowData from onRowContextMenu event of container

            this.delete(this.menu.rowData);
        }.scope(this));

        this.container = jQuery(selector).propertygrid({
            onRowContextMenu: this.menu.onContextMenuHandler.scope(this.menu),
            onDblClickRow   : this.onDblClickRow.scope(this),
            onAfterEdit     : this.onAfterEdit.scope(this)
        });

        this.container.parents('.panel-body').find('.toolbar .button.save').click(this.save.scope(this));
        this.container.parents('.panel-body').find('.toolbar .button.new').click(this.new.scope(this));
        this.container.parents('.panel-body').find('.toolbar .button.new-array').click(this.newArray.scope(this));

        this.editDialog = new MongoEditor.Collection.Property.Edit.Dialog('#edit-property-dialog');

        this.editDialog.addEvent('set', this.set.scope(this));
    },

    loadByTreeGrid: function(treeGrid) {
        var rowData = treeGrid.getPropertyData(treeGrid.selectedRow);

        this.reload(rowData);
    },

    reload: function(data) {
        if (!data) {
            data = this.container.propertygrid('getData');
        }

        this.container.propertygrid('loadData', data);
    }
});