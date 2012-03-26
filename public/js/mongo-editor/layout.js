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
            var rowData = treeGrid.getPropertyData(selectedRow);

            propertyGrid.container.propertygrid('loadData',
                {"rows": rowData}
            );
        });

        propertyGrid.addEvent('onAfterEdit', function(rowIndex, rowData, changes) {
            treeGrid.container.treegrid('loadData', treeGrid.container.treegrid('getData'));
        });

        propertyGrid.addEvent('save', function () {
            jQuery.ajax({
                url: '/data.php?controller=collection&action=save',
                type: 'POST',
                data: {
                    document: treeGrid.data[treeGrid.object._id['$id']]
                },
                success: function () {

                },
                dataType: 'json'
            });
        });

        propertyGrid.addEvent('new', function (item) {
            item.id = MongoEditor.Data.Tree.getId(treeGrid.selectedRow.id, item.key);

            treeGrid.object[item.key] = item.value;

            var treeData = new MongoEditor.Data.Tree(treeGrid.data);

            var treeDataTransform = treeData.transform();

            treeDataTransform = array_merge_recursive(treeDataTransform, treeGrid.container.treegrid('getData'));

            treeGrid.container.treegrid('loadData', treeDataTransform);
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