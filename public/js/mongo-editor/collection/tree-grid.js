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
    treeData: null,

    supportObject: function(id, object, treeData) {
        jQuery(object).each(function (key, value) {
            var item = null;

            jQuery(treeData).each(function (k, i) {
                if (key === k) {
                    item = i;
                }

                if (!object[key]) {
                    i.parent.children.removeByElement(i);
                }
            });

            if (item) {
                item.value = value;
            } else {
                i.parent.children.push({
                    id: id,
                    key: key,
                    value: value
                });
            }
        });
    },

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
        var row = this.getParentRow(row);

        return this.data[row.key];
    },

    getParentRow: function (row) {
        if (row._parentId) {
            return this.getParentRow(this.container.treegrid('getParent', row.id));
        } else {
            return row;
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

                this.treeData = treeData.transform();

                this.container.treegrid('loadData', this.treeData);
            }.scope(this),
            dataType: 'json'
        });
    },

    reload: function(data) {
        if (!data) {
            data = this.container.treegrid('getData');
        }

        var parentRow = this.getParentRow(this.selectedRow);

        console.log(parentRow);

        this.supportObject(parentRow.id, this.object, this.treeData);

        this.container.treegrid('loadData', data);
    }
});