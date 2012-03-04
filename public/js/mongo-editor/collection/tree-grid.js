/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 07.01.12
 * Time: 23:24
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Collection.TreeGrid');

MongoEditor.Collection.TreeGrid = new Class({
    Implements: [Options, Events],

    object: null,

    onDblClickRow: function (selectedRow) {
        this.container.treegrid('expand', selectedRow.id);
    },

    getPropertyData: function (selectedRow) {
        var rowData = [];

        if (selectedRow.children) {
            selectedRow.children.each(function (item) {
                var data = {
                    "parent": selectedRow,
                    "id": item.id,
                    "name": item.key,
                    "value": item.value,
                    "editor": 'text'
                }

                if (item.children) {
                    data.value = '[...]';
                    data.type = 'array';
                }

                rowData.push(data);
            });
        } else {
            rowData.push({
                "id": selectedRow.id,
                "name": selectedRow.key,
                "value": selectedRow.value,
                "editor": 'text'
            });
        }

        return rowData;
    },

    getObject: function (row) {
        if (row._parentId) {
            return this.getObject(this.container.treegrid('getParent', row.id));
        } else {
            return row.object;
        }
    },

    onClickRow: function (selectedRow) {
        this.object = this.getObject(selectedRow);

        console.log(this.object);

        this.fireEvent('onClickRow', [selectedRow]);
    },

    initialize: function(selector, options){
        this.setOptions(options);

        this.container = jQuery(selector).treegrid({
            url: '/data.php?controller=collection&action=search&view=treeGrid&collection=test',
            fitColumns: true,
            columns: [[
                {title:'Key',   field:'key', width: 200},
                {title:'Value', field:'value', width: 200}
            ]],
            onClickRow   : this.onClickRow.scope(this),
            onDblClickRow: this.onDblClickRow.scope(this)
        });
    }
});