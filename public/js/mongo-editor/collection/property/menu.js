/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 25.03.12
 * Time: 15:01
 * To change this template use File | Settings | File Templates.
 */

MongoEditor.Collection.Property.Menu = new Class({
    Implements: [Options, Events, MongoEditor.Collection.Menu.Abstract],

    delete: function() {
        this.fireEvent('delete');
    },

    edit: function() {
        this.fireEvent('edit');
    }
});