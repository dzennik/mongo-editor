/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 07.01.12
 * Time: 23:41
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Layout');
jQuery.namespace('MongoEditor.Obj.Collection');

MongoEditor.Layout = new Class({
    init: function() {
        var treeGrid = new MongoEditor.Collection.TreeGrid('#data-region-tree-grid');

        var propertyGrid = new MongoEditor.Collection.Property('#array-property-grid');

        treeGrid.addEvent('delete', function (row) {
            if (!row._parentId) {
                jQuery.messager.confirm('Confirm', 'Are you sure you want to delete document?', function (choose) {
                    if (choose) {
                        jQuery.ajax({
                            url: '/data.php?controller=collection&action=delete',
                            type: 'POST',
                            data: {
                                id: row.key
                            },
                            success: function (result) {
                                if (result.success) {
                                    jQuery.messager.alert('Warning', 'The document was deleted!');
                                }
                            },
                            dataType: 'json'
                        });
                    }
                });
            } else {
                var object = treeGrid.getObjectById(row._parentId);

                Array.deleteElement(object, object[row.key]);

                treeGrid.updateRow(row);

                treeGrid.reload();
            }
        });

        treeGrid.addEvent('new', function (row) {
            var object = treeGrid.getObjectById(row._parentId);

            object[item.key] = item.value;

            treeGrid.updateRow(row);

            // reload tree grid
            treeGrid.reload();
        });

        treeGrid.addEvent('onClickRow', function (selectedRow) {
            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('onAfterEdit', function(rowIndex, rowData, changes) {
            treeGrid.container.treegrid('loadData', treeGrid.container.treegrid('getData'));
        });

        propertyGrid.addEvent('save', function () {
            jQuery.ajax({
                url: '/data.php?controller=collection&action=save',
                type: 'POST',
                data: {
                    document: jQuery.toJSON(treeGrid.data[treeGrid.object._id['$id']])
                },
                success: function (result) {
                    if (result.success) {
                        jQuery.messager.alert('Warning', 'The document was saved!');
                    }
                },
                dataType: 'json'
            });
        });

        propertyGrid.addEvent('delete', function (row) {
            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            console.log(treeGrid.selectedRow.id, row.item.key);

            Array.deleteElement(object, object[row.item.key]);

            treeGrid.updateRow(treeGrid.selectedRow);

            treeGrid.reload();

            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('new', function (item) {
            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            object[item.key] = item.value;

            treeGrid.updateRow(treeGrid.selectedRow);

            // reload tree grid
            treeGrid.reload();

            // reload property drid
            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('newArray', function (item) {
            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            if (jQuery.isArray(object)) {
                object.push({});
            } else {
                object[item.key] = {};
            }

            treeGrid.updateRow(treeGrid.selectedRow);

            // reload tree grid
            treeGrid.reload();

            // reload property drid
            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('onGoToArray', function (rowIndex, rowData) {
            treeGrid.container.treegrid('unselectAll');
            treeGrid.container.treegrid('expand', rowData.parent.id);

            // generation click event:
            jQuery('tr[node-id=' + rowData.id + '] td[field=key]').click();

            treeGrid.container.treegrid('expand', rowData.id);
        });
    },

    initialize: function() {
        this.init();
    }
});