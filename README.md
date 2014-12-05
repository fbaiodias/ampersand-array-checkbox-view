# ampersand-options-view

A view module for rendering and validating multiple checkbox inputs. Works well with ampersand-form-view.

It does the following:

- Automatically shows/hides error message based required.
- Will only show error message if the number of selected checkbox if off the specified limits

## install (not yet available)

```
npm install ampersand-options-view 
```

## example

```javascript
var FormView = require('ampersand-form-view');
var OptionsView = require('ampersand-options-view');

module.exports = FormView.extend({
  fields: function () {
      return [
        new OptionsView({
          // form input `name`
          name: 'color',
          // You can replace the built-in templates with your own.
          template: // some HTML string
          fieldTemplate: // some HTML string
          // Label name
          label: 'Choose your colors',
          // you can pass simple string options
          options: ['blue', 'orange', 'red'],
          // Message to use if error is that it's required
          // but no value was set.
          requiredMessage: 'This box must be checked.',
        }),
        new OptionsView({
            name: 'color',
            // you can also pass pairs, first is the value, second is the value
            options: ['blue', 'orange', 'red'],
        }),
        new OptionsView({
            name: 'color',
            // you can also pass pairs, first is the value, second is the value
            options: [['blue', true], ['orange', true], ['red', false]],
        })
      ];
    }
});

var field = new CheckboxView({
    name: 'color',
    // you can also pass thirds, first is the value, second is the value, the third is the label
    options: [['blue', true, 'Blue'], ['orange', true, 'Orange'], ['red', false, 'Red']],
});

// append it somewhere or use it in side an ampersand-form-view
document.querySelector('form').appendChild(field.el);

```

## credits

Created by [Francisco Dias](http://twitter.com/xicombd).

## license

MIT

