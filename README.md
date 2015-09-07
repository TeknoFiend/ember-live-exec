# Ember-live-exec

Write (or edit) code in the browser and see the updates interactively. Document Ember code with live examples withouth duplication.

Similar to [Ember Twiddle](http://ember-twiddle.com/) or [JSFiddle](https://jsfiddle.net/) except turned on its head. Instead of representing an entire app, ember-live-exec lets you drop `live-exec` editable examples anywhere in your existing Ember app. You can even put multiple `live-exec` regions on the same page.

## Installation

`ember install ember-live-exec`

# Usage

```hbs
{{#live-exec}}
  {{live-exec-template source='
Name: {{input value=name}}

{{#if name}}
  <div>Hello, {{name}}.</div>
{{/if}}
'}}
  {{live-exec-output}}
{{/live-exec}}'}}
```

![Screenshot](/docs/demo.png)

![Screencapture](/docs/demo.gif)

# Development

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
