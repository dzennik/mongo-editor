/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 09.04.12
 * Time: 23:04
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Object.Db.Collection');

MongoEditor.Object.Db.Collection = new Class({
    Implements: [Options, Events],

    data: null,

    collections: [],

    initialize: function(data, options) {
        this.setOptions(options);

        this.data = data;

        this.init();
    },

    init: function () {

    }
});