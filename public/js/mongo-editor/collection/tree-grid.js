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

    data: null,
    object: null,
    selectedRow: null,

    getObjectById: function (id) {
        var path = id.split('-');
        var pathLength = path.length;
        var object = this.data;

        jQuery.each(path, function (index, key) {
            if (key === 'col') {
                return;
            }

            if (pathLength - 1 === index && typeof object[key] !== 'object') {
                return;
            }

            object = object[key];
        });

        return object;
    },

    getRowById: function () {

    },

    getPropertyData: function (selectedRow) {
        var rowData = [];

        if (selectedRow.children) {
            selectedRow.children.each(function (item) {
                var data = {
                    "parent": selectedRow,
                    "item": item,
                    "object": this.getObjectById(item.id),
                    "id": item.id,
                    "name": item.key,
                    "value": item.value,
                    "type": 'value',
                    "editor": 'text'
                };

                if (item.children) {
                    data.value = '[...]';
                    data.type = 'array';
                }

                rowData.push(data);
            }.scope(this));
        } else {
            //console.log(this.getObjectById(selectedRow.id));
            rowData.push({
                "item": selectedRow,
                "object": this.getObjectById(selectedRow.id),
                "id": selectedRow.id,
                "name": selectedRow.key,
                "value": selectedRow.value,
                "type": 'value',
                "editor": 'text'
            });
        }

        return rowData;
    },

    getObject: function (row) {
        if (row._parentId) {
            return this.getObject(this.container.treegrid('getParent', row.id));
        } else {
            return this.data[row.key];
        }
    },

    onClickRow: function (selectedRow) {
        if (typeof selectedRow.children) {
            if (selectedRow.state === 'closed') {
                this.container.treegrid('expand', selectedRow.id);
            } else {
                this.container.treegrid('collapse', selectedRow.id);
            }
        }

        this.object      = this.getObject(selectedRow);
        this.selectedRow = selectedRow;

        this.fireEvent('onClickRow', [selectedRow]);
    },

    initialize: function(selector, options){
        this.setOptions(options);

        this.container = jQuery(selector).treegrid({
            fitColumns: true,
            columns: [[
                {title:'Key',   field:'key', width: 200},
                {title:'Value', field:'value', width: 200}
            ]],
            onClickRow   : this.onClickRow.scope(this)
        });

        this.loader();
    },

    loader: function() {
        jQuery.ajax({
            url: '/data.php?controller=collection&action=search',
            success: function(data) {
                this.data = data;

                var treeData = new MongoEditor.Data.Tree(data);

                this.container.treegrid('loadData', treeData.transform());
            }.scope(this),
            dataType: 'json'
        });
    }
});