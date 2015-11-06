/*$AMPERSAND_VERSION*/
var View = require('ampersand-view');
var _ = require('underscore');
var CheckboxView = require('ampersand-checkbox-view');

var defaultTemplate = [
    '<div>',
        '<span data-hook="label"></span>',
        '<div data-hook="field-container"></div>',
        '<div data-hook="main-message-container" class="message message-below message-error">',
            '<p data-hook="main-message-text"></p>',
        '</div>',
    '</div>'
].join('');
var defaultFieldTemplate = [
    '<label class="checkbox">',
        '<input type="checkbox"><span data-hook="label"></span>',
        '<div data-hook="message-container" class="message message-below message-error">',
            '<p data-hook="message-text"></p>',
        '</div>',
    '</label>'
].join('');


module.exports = View.extend({
    initialize: function () {
        if (!this.label) this.label = this.name;
        this.fields = [];
        // calculate default value if not provided
        var defaultVal = [];
        if (!this.value.length) this.value = defaultVal;

        this.on('change:valid change:value', this.updateParent, this);
        this.render();
    },
    render: function () {
        if (this.rendered) return;

        this.renderWithTemplate();
        this.setOptions(this.options);
        this.rendered = true;
    },
    bindings: {
        'name': {
            type: 'attribute',
            selector: 'input',
            name: 'name'
        },
        'label': {
            hook: 'label'
        },
        'message': {
            type: 'text',
            hook: 'main-message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'main-message-container'
        },
    },
    props: {
        name: ['string', true, ''],
        options: ['array', true, function () { return []; }],
        value: ['array', true, function () { return []; }],
        label: ['string', true, ''],
        message: ['string', true, ''],
        placeholder: ['string', true, ''],
        requiredMessage: 'string',
        minLength: ['number', true, 0],
        maxLength: ['number', true, 10],
        template: ['string', true, defaultTemplate],
        fieldTemplate: ['string', true, defaultFieldTemplate],
        type: ['string', true, 'text']
    },
    session: {
        shouldValidate: ['boolean', true, false],
        fieldsValid: ['boolean', true, false],
        fieldsRendered: ['number', true, 0],
        rendered: ['boolean', true, false]
    },
    derived: {
        valid: {
            deps: ['requiredMet'],
            fn: function () {
                return this.requiredMet;
            }
        },
        showMessage: {
            deps: ['valid', 'shouldValidate', 'message'],
            fn: function () {
                return !!(this.shouldValidate && this.message && !this.valid);
            }
        },
        requiredMet: {
            deps: ['minLength', 'value'],
            fn: function () {
                return this.value.length >= this.minLength && this.value.length <= this.maxLength;
            }
        }
    },
    setOptions: function (arr) {
        if (arr.length == 0) throw Error('No options provided');
        if (arr.length < this.minLength) throw Error('Options length lesser than minLength setting');

        this.clearFields();
        arr.forEach(this.addField, this);
        this.update();
    },
    beforeSubmit: function () {
        this.fields.forEach(function (field) {
            field.beforeSubmit();
        });

        this.shouldValidate = true;
        if (!this.valid) {
            this.message = this.requiredMessage || this.getRequiredMessage();
        }
    },
    addField: function (item) {
        var fieldName = item;
        var fieldLabel = item;
        if(item instanceof Array) {
            fieldName = item[0];
            fieldLabel = item[1] || item[0];
        }

        var options = {
            name: fieldName,
            label: fieldLabel,
            template: this.fieldTemplate,
            parent: this
        };

        options.value = this.value.indexOf(options.name) != -1;

        var field = new CheckboxView(options);
        field.render();
        this.fieldsRendered += 1;
        this.fields.push(field);
        this.queryByHook('field-container').appendChild(field.el);
        return field;
    },
    clearFields: function () {
        this.fields.forEach(function (field) {
            field.remove();
        });
        this.fields = [];
        this.fieldsRendered = 0;
    },
    update: function () {
        if(this.fieldsRendered < this.options.length) {
            return;
        }

        var valid = true;
        var value = this.fields.reduce(function (previous, field) {
            if (field.value) previous.push(field.name);
            if (!field.valid && valid) valid = false;
            return previous;
        }, []);
        this.set({
            value: value,
            fieldsValid: valid
        });
    },
    updateParent: function () {
        if (this.parent) this.parent.update(this);
    },
    getRequiredMessage: function () {
        var plural;
        if(!(this.value.length >= this.minLength && this.value.length <= this.maxLength)) {
            plural = this.maxLength > 1;
            var twoItems = this.maxLength-this.minLength==1;
            if(this.minLength != this.maxLength) {
                return 'Select '+(twoItems ? '' : 'between ')+this.minLength+' '+(twoItems ? 'or' : 'and')+' '+this.maxLength+' item' + (plural ? 's.' : '.');
            }

            return 'Select '+this.maxLength+' item' + (plural ? 's.' : '.');
        }

        if(!(this.value.length >= this.minLength)) {
            plural = this.minLength > 1;
            return 'Enter at least ' + (this.minLength || 1) + ' item' + (plural ? 's.' : '.');
        }

        plural = this.maxLength > 1;
        return 'Enter at most ' + (this.maxLength || 1) + ' item' + (plural ? 's.' : '.');

    }
});
