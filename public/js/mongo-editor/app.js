/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 05.01.12
 * Time: 12:41
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.App');
jQuery.namespace('MongoEditor.Obj');

MongoEditor.App = new Class({
    initialize: function() {
        MongoEditor.Obj.layout = new MongoEditor.Layout();
    }
});

jQuery(function () {
    MongoEditor.Obj.app = new MongoEditor.App();
});