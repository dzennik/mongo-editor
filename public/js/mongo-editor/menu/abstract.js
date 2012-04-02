/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 31.03.12
 * Time: 19:44
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Collection.Menu.Abstract');

MongoEditor.Collection.Menu.Abstract = new Class({
    Implements: [Options, Events],

    onClick: function (item) {
        eval('this.' + jQuery(item.target).attr('rel') + '()');
    },

    onContextMenuHandler: function(e) {
        this.container.menu('show', {
            left: e.pageX,
            top: e.pageY
        });

        this.selected = arguments;

        this.fireEvent('onContextMenu', arguments);

        return false;
    },

    initialize: function(selector, options) {
        this.setOptions(options);

        this.container = jQuery(selector).menu({
            onClick: this.onClick.scope(this)
        });
    }
});