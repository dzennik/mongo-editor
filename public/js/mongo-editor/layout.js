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
                success: function () {

                },
                dataType: 'json'
            });
        });

        propertyGrid.addEvent('delete', function (rowIndex, rowData) {
            //rowData.parent.children.removeByElement(rowData.item);

            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            Array.deleteElement(object, object[rowData.item.key]);

            //data = propertyGrid.container.propertygrid('getData');
            //data.rows.removeByElement(rowData);

            treeGrid.reload();

            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('new', function (item) {
            //item.id = MongoEditor.Data.Tree.getId(treeGrid.selectedRow.id, item.key);

            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            object[item.key] = item.value;

            //var row = treeGrid.getRowById(treeGrid.selectedRow.id);
            //row.push(item);

            // reload tree grid
            treeGrid.reload();

            // reload property drid
            propertyGrid.loadByTreeGrid(treeGrid);
        });

        propertyGrid.addEvent('newArray', function (item) {
            var object = treeGrid.getObjectById(treeGrid.selectedRow.id);

            if (jQuery.isArray(object)) {
                object.push({});
                console.log(object);
            } else {
                object[item.key] = {};
            }

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