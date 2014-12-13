# ampersand-array-checkbox-view

A view module for rendering and validating multiple checkbox inputs. Works well with ampersand-form-view.

It does the following:

- Automatically shows/hides error message based required.
- Will only show error message if the number of selected checkbox if off the specified limits

## install

```
npm install ampersand-array-checkbox-view
```

## try it out
```
npm run demo
```


## example

```javascript
var FormView = require('ampersand-form-view');
var CheckboxArray = require('ampersand-array-checkbox-view');

module.exports = FormView.extend({
  fields: function () {
      return [
        new CheckboxArray({
          // form input `name`
          name: 'color',
          // You can replace the built-in templates with your own.
          template: // some HTML string
          fieldTemplate: // some HTML string
          // Label name
          label: 'Pick a color!',
          // you can pass simple string options
          options: ['blue', 'orange', 'red'],
        }),
        new CheckboxArray({
          name: 'option',
          // you can also pass pairs, first is the value, second is used for the label
          options: [ ['a', 'Option A'], ['b', 'Option B'], ['c', 'Option C'] ]
        })
      ];
    }
});
```

## credits

Created by [Francisco Dias](http://twitter.com/xicombd).

## license

MIT

