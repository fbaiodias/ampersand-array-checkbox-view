/*global console, window*/
// can be run with `npm run demo`
var OptionsInput = require('./ampersand-options-view');
var FormView = require('ampersand-form-view');


var input = new OptionsInput({
    label: 'What do you want?',
    name: 'food-options',
    options: [
      ['banana', true, 'Very good banana'],
      ['atum', false, 'Wow such tuna']
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
