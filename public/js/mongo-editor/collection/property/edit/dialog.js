/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 01.04.12
 * Time: 18:41
 * To change this template use File | Settings | File Templates.
 */

jQuery.namespace('MongoEditor.Collection.Property.Edit.Dialog');

MongoEditor.Collection.Property.Edit.Dialog = new Class({
    Implements: [Options, Events],

    forms: [
        'simpleForm',
        'keyForm'
    ],

    formData: null,

    hideAllForm: function() {
        jQuery.each(this.forms, function (index, form) {
            jQuery(this[form].container).hide();
        }.scope(this));
    },

    detectForm: function(formData) {
        switch (formData.type) {
            case 'array':
                return this.keyForm;
                break;

            default:
                return this.simpleForm;
        }
    },

    set: function () {
        if (this.form.validate()) {
            this.container.dialog('close');

            this.fireEvent('set', this.form.getData());
        }
    },

    close: function () {
        this.container.dialog('close');
    },

    open: function (formData) {
        this.formData = formData;

        this.hideAllForm();

        this.form = this.detectForm(formData);

        this.form.load(formData);

        jQuery(this.form.container).show();

        this.container.dialog('open');
    },

    initialize: function(selector, options) {
        this.setOptions(options);

        this.container = jQuery(selector).dialog();

        jQuery(jQuery(this.container).attr('buttons')).find('.set').click(this.set.scope(this));
        jQuery(jQuery(this.container).attr('buttons')).find('.close').click(this.close.scope(this));

        this.simpleForm = new MongoEditor.Collection.Property.Edit.SimpleForm(this.container.find('.simple-form'));
        this.keyForm = new MongoEditor.Collection.Property.Edit.SimpleForm(this.container.find('.key-form'));
    }
});