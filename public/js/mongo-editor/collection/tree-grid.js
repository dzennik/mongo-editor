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
        Array.each(object, function (key, value) {
            if (key === '_id') {
                return;
            }

            var item = null;

            jQuery(treeData).each(function (k, i) {
                if (key == i.key) {
                    item = i;
                }

                if (!object[i.key]) {
                    treeData.removeByElement(i);
                }
            });

            var currentId = MongoEditor.Data.Tree.getId(id, key);

            if (item) {
                if (typeof value === 'object') {
                    if (item.children) {
                        this.supportObject(currentId, value, item.children);

                        if (Object.keys(value).length === 0) {
                            item.children = [];
                        }
                    } else {
                        item.children = [];
                    }

                    return;
                }

                item.value = value;
            } else {
                var newItem = {
                    id: currentId,
                    key: key,
                    value: value
                };

                if (typeof value === 'object') {
                    newItem.children = [];
                }

                treeData.push(newItem);
            }
        }.scope(this));
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

    new: function (row) {
        var item = {
            key: 'TEST RECORD',
            value: 13515
        };

        this.fireEvent('new', [row, item]);
    },

    delete: function (row) {
        this.fireEvent('delete', [row]);
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

    onDblClickRow: function (selectedRow) {
        if (typeof selectedRow.children) {
            if (selectedRow.state !== 'closed') {
                this.container.treegrid('collapse', selectedRow.id);
            }
        }
    },

    onClickRow: function (selectedRow) {
        if (typeof selectedRow.children) {
            if (selectedRow.state === 'closed') {
                this.container.treegrid('expand', selectedRow.id);
            }
        }

        this.object      = this.getObject(selectedRow);
        this.selectedRow = selectedRow;

        this.fireEvent('onClickRow', [selectedRow]);
    },

    initialize: function(selector, options){
        this.setOptions(options);

        this.menu = new MongoEditor.Collection.TreeGrid.Menu('#collection-edit-menu');

        this.menu.addEvent('new', function () {
            this.menu.rowData = this.menu.selected[1]; // rowData from onRowContextMenu event of container

            this.new(this.menu.rowData);
        });

        this.menu.addEvent('delete', function () {
            this.menu.rowData = this.menu.selected[1]; // rowData from onRowContextMenu event of container

            this.delete(this.menu.rowData);
        }.scope(this));

        this.container = jQuery(selector).treegrid({
            fitColumns: true,
            columns: [[
                {title:'Key',   field:'key', width: 200},
                {title:'Value', field:'value', width: 200}
            ]],
            onClickRow   : this.onClickRow.scope(this),
            onDblClickRow: this.onDblClickRow.scope(this),
            onContextMenu: this.menu.onContextMenuHandler.scope(this.menu)
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

        this.container.treegrid('loadData', data);
    },

    updateRow: function (row) {
        var parentRow = this.getParentRow(row);
        var object    = this.getObject(row);

        this.supportObject(parentRow.id, object, parentRow.children);

        if (object['_id'] && Object.keys(object).length === 1) {
            var rowData = this.getParentRow(row);

            parentRow.children = [];
        }
    }
});