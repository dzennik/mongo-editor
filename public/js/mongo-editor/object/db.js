/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 09.04.12
 * Time: 23:09
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Object.Db');

MongoEditor.Object.Db = new Class({
    Implements: [Options, Events],

    data: null,

    collections: [],

    initialize: function(data, options) {
        this.setOptions(options);

        this.data = data;

        this.init();
    },

    init: function () {
        if (this.data.collections) {
            jQuery(this.data.collections).each(function (index, collection) {
                this.collections.push(new MongoEditor.Object.Db.Collection(collection));
            });
        }
    },

    getName: function () {
        return this.data.name;
    }
});