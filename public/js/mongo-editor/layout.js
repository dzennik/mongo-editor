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
        MongoEditor.Obj.collection = new MongoEditor.Collection.TreeGrid('#data-region-tree-grid');

        var treeGridContainer = MongoEditor.Obj.collection.container;

        treeGridContainer.treegrid({
            'onClickRow': function (selectedRow) {
                var propertyGridRows = [];

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

                        propertyGridRows.push(data);
                    });
                } else {
                    propertyGridRows.push({
                        "id": selectedRow.id,
                        "name": selectedRow.key,
                        "value": selectedRow.value,
                        "editor": 'text'
                    });
                }

                jQuery('#tt').propertygrid('loadData',
                    {"rows": propertyGridRows}
                );

                jQuery('#tt').propertygrid({
                    'onDblClickRow': function (rowIndex, rowData) {
                        if (rowData.type) {
                            switch (rowData.type) {
                                case 'array':
                                    treeGridContainer.treegrid('unselectAll');
                                    treeGridContainer.treegrid('expand', rowData.parent.id);

                                    // generation click event:
                                    jQuery('tr[node-id=' + rowData.id + '] td[field=key]').click();

                                    treeGridContainer.treegrid('expand', rowData.id);

                                    break;
                            }
                        }

                        return false;
                    }
                });

            }
        });

//        jQuery('#tt').propertygrid('loadData',
//            {"total":7,"rows":[
//            	{"name":"Name","value":"Bill Smith","group":"ID Settings","editor":"text"},
//            	{"name":"Address","value":"","group":"ID Settings","editor":"text"},
//            	{"name":"Age","value":"40","group":"ID Settings","editor":"numberbox"},
//            	{"name":"Birthday","value":"01/02/2012","group":"ID Settings","editor":"datebox"},
//            	{"name":"SSN","value":"123-456-7890","group":"ID Settings","editor":"text"},
//            	{"name":"Email","value":"bill@gmail.com","group":"Marketing Settings","editor":{
//            		"type":"validatebox",
//            		"options":{
//            			"validType":"email"
//            		}
//            	}},
//            	{"name":"FrequentBuyer","value":"false","group":"Marketing Settings","editor":{
//            		"type":"checkbox",
//            		"options":{
//            			"on":true,
//            			"off":false
//            		}
//            	}}
//            ]}
//        );
    },

    initialize: function() {
        this.init();
    }
});