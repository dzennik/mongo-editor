/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 31.03.12
 * Time: 19:10
 * To change this template use File | Settings | File Templates.
 */

MongoEditor.Collection.TreeGrid.Menu = new Class({
    Implements: [Options, Events, MongoEditor.Collection.Menu.Abstract],

    delete: function() {
        this.fireEvent('delete');
    },

    new: function() {
        this.fireEvent('new');
    },

    newArray: function() {
        this.fireEvent('newArray');
    }
});