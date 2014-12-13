/* global window*/
var test = require('tape');
var InputView = require('../ampersand-array-checkbox-view');
if (!Function.prototype.bind) Function.prototype.bind = require('function-bind');


function simClick(el) {
    var ev = document.createEvent('MouseEvent');
    ev.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(ev);
}

function isHidden(el) {
    return el.style.display === 'none';
}

test('basic init', function (t) {
    var input = new InputView({name: 'hi', options: ['a', 'b']});
    t.equal(input.el.tagName, 'DIV');
    t.ok(input.el.querySelector('label'));
    t.equal(input.el.querySelectorAll('input').length, 2);
    t.end();
});

test('init with value', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b', 'c'],
        value: ['b']
    });
    t.deepEqual(input.value, ['b']);
    t.end();
});

test('init with less options than minValue', function (t) {
    t.throws(function () {
        new InputView({
            name: 'hi',
            options: ['a', 'b'],
            minLength: 4
        });
    });
    t.end();
});

test('selecting checkboxes', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b', 'c'],
        minLength: 1
    });
    document.body.appendChild(input.el);
    var checkboxes = input.el.querySelectorAll('input');
    t.deepEqual(input.value, [], 'value should start with empty array');
    simClick(checkboxes[0]);
    simClick(checkboxes[1]);
    t.deepEqual(input.value, ['a', 'b'], 'value should now be [\'a\',\'b\']');
    simClick(checkboxes[0]);
    t.deepEqual(input.value, ['b'], 'value should now be [\'b\']');
    simClick(checkboxes[1]);
    t.deepEqual(input.value, [], 'value should now be []');
    document.body.removeChild(input.el);
    t.end();
});

test('error message visibility with 0 minimum length', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b'],
        minLength: 0
    });
    var errorMessage = input.el.querySelector('[data-hook=main-message-container]');
    t.ok(isHidden(errorMessage), 'error should be hidden to start');
    input.beforeSubmit();
    t.ok(isHidden(errorMessage), 'error should continue hidden');
    t.end();
});

test('error message visibility with minimum length', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b'],
        minLength: 1
    });
    var errorMessage = input.el.querySelector('[data-hook=main-message-container]');
    t.ok(isHidden(errorMessage), 'error should be hidden to start');
    input.beforeSubmit();
    t.ok(!isHidden(errorMessage), 'error should be visible now');
    t.end();
});

test('error message visibility with maximum length', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b'],
        maxLength: 1
    });
    document.body.appendChild(input.el);
    var checkboxes = input.el.querySelectorAll('input');
    var errorMessage = input.el.querySelector('[data-hook=main-message-container]');
    t.ok(isHidden(errorMessage), 'error should be hidden to start');
    simClick(checkboxes[0]);
    simClick(checkboxes[1]);
    input.beforeSubmit();
    t.ok(!isHidden(errorMessage), 'error should be visible now');
    t.end();
});

test('selecting checkboxes', function (t) {
    var input = new InputView({
        name: 'hi',
        options: ['a', 'b', 'c'],
        minLength: 1
    });
    document.body.appendChild(input.el);
    var checkboxes = input.el.querySelectorAll('input');
    t.deepEqual(input.value, [], 'value should start with empty array');
    simClick(checkboxes[0]);
    simClick(checkboxes[1]);
    t.deepEqual(input.value, ['a', 'b'], 'value should now be [\'a\',\'b\']');
    simClick(checkboxes[0]);
    t.deepEqual(input.value, ['b'], 'value should now be [\'b\']');
    simClick(checkboxes[1]);
    t.deepEqual(input.value, [], 'value should now be []');
    document.body.removeChild(input.el);
    t.end();
});

test('selecting checkboxes with custom labels', function (t) {
    var input = new InputView({
        name: 'hi',
        options: [['a', 'A'], ['b','B'], ['c','C']],
        minLength: 1
    });
    document.body.appendChild(input.el);
    var checkboxes = input.el.querySelectorAll('input');
    t.deepEqual(input.value, [], 'value should start with empty array');
    simClick(checkboxes[0]);
    simClick(checkboxes[1]);
    t.deepEqual(input.value, ['a', 'b'], 'value should now be [\'a\',\'b\']');
    simClick(checkboxes[0]);
    t.deepEqual(input.value, ['b'], 'value should now be [\'b\']');
    simClick(checkboxes[1]);
    t.deepEqual(input.value, [], 'value should now be []');
    document.body.removeChild(input.el);
    t.end();
});