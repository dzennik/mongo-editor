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

    options: {
        url: '/data.php?controller=collection&action=search&view=treeGrid&collection=test',
        fitColumns: true,
        columns: [[
            {title:'Key',   field:'key', width: 200},
            {title:'Value', field:'value', width: 200}
        ]]
    },

    apply: function(options) {
        this.container.treegrid(options);
    },

    initialize: function(selector, options){
        this.setOptions(options);

        this.container = jQuery(selector);

        this.apply(this.options);

        this.load();
    },

    load: function() {
        this.container.treegrid({
            url: this.options.url
        });
    }
});