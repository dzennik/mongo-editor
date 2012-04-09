/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 09.04.12
 * Time: 22:38
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Object.Tree');

MongoEditor.Object.Tree = new Class({
    Implements: [Options, Events],

    data: null,

    dbs: [],

    initialize: function(selector, options) {
        this.setOptions(options);

        /// data.php?controller=object&action=list

        this.container = jQuery(selector).tree();

        this.loader();
    },

    getTreeData: function() {
        var data = {};
        jQuery(this.dbs).each(function (index, db) {
            data[db.getName()] = {};
        });

        return data;
    },

    loader: function() {
        jQuery.ajax({
            url: '/data.php?controller=object&action=list',
            success: function(data) {
                this.data = data;

                this.dbs = [];

                jQuery.each(this.data.databases, function (index, db) {
                    this.dbs.push(new MongoEditor.Object.Db(db));
                }.scope(this));

                var treeData = new MongoEditor.Data.Tree(this.getTreeData());

                this.treeData = treeData.transform();

                this.container.tree('loadData', this.treeData);
            }.scope(this),
            dataType: 'json'
        });
    }

});