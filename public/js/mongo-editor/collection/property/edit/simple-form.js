/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 01.04.12
 * Time: 18:41
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Collection.Property.Edit.Form');

MongoEditor.Collection.Property.Edit.SimpleForm = new Class({
    Implements: [Options, Events],

    typeFields: ['input', 'textArea'],

    formData: null,

    load: function (formData) {
        this.formData = formData;

        this.container.form('load', formData);
    },

    validate: function () {
        return this.container.form('validate');
    },

    getData: function () {
        jQuery.each(this.typeFields, function (index, typeField) {
            jQuery(this.container.find('.fitem ' + typeField)).each(function (index, formItem) {
                this.formData[jQuery(formItem).attr('name')] = jQuery(formItem).attr('value');
            }.scope(this));
        }.scope(this));

        return this.formData;
    },

    initialize: function(selector, options) {
        this.setOptions(options);

        this.container = jQuery(selector).form();
    }
});