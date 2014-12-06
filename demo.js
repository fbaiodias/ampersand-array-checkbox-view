/*global console, window*/
// can be run with `npm run demo`
var ArrayCheckbox = require('./ampersand-array-checkbox-view');
var FormView = require('ampersand-form-view');


var input = new ArrayCheckbox({
    label: 'Colors',
    name: 'color',
    value: ['green'],
    minLength: 0,
    maxLength: 2,
    options: [
      ['red', 'Red'],
      ['green', 'Green'],
      ['blue', 'Blue']
    ],
});

var form = document.createElement('form');
form.innerHTML = '<div data-hook="field-container"></div><input type="submit">';

var formView = new FormView({
    el: form,
    fields: [input],
    submitCallback: function (vals) {
        console.log(vals);
    }
});

window.formView = formView;

document.body.appendChild(formView.el);
