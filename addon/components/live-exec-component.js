import Ember from 'ember';
import LiveExec from './live-exec';

export default Ember.Component.extend({
  classNamebindings: [':live-exec__component', 'class'],

  /**
    Action and property definitions for the instance of the component
    associated with the rendered template. Should be defined as if
    already in the body of a component definition (i.e. leave out
    wrapping braces or `Ember.Component.extend({`.

    E.g. - to set a property called `foo` and create an action called
    `toggleFoo` you would do this:

      ```javascript
      foo: true,
      actions: {
        toggleFoo: function() {
          console.log( "Toggling foo!" );
          this.set( "foo", !this.get("foo") );
        }
      }
      ```

    @property source
    @type String
    @default ''
  */
  source: '',

  setLiveExecParent: function() {
    this.set('liveExec', this.nearestOfType( LiveExec ));
    if( !this.get('liveExec') ) {
      throw new Error('live-exec-template can only be used inside live-exec');
    }
    this.set('source', this.get('source').trim());
    this.get('liveExec').signalComponentReady(this);
  },

  _didInsertElement: Ember.on( 'didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, 'setLiveExecParent');
  })

});
