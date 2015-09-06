import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'live-exec',

  renderOutput: Ember.observer( 'templateComponent.source', 'outputComponent', function() {
    if( this.get('templateComponent') && this.get('outputComponent') ) {
      this.outputComponent.reRender( this.get('templateComponent.source') );
    }
  }),

  signalTemplateReady: function(templateComponent) {
    this.set( 'templateComponent', templateComponent );
  },

  signalOutputReady: function(outputComponent) {
    this.set( 'outputComponent', outputComponent );
  }

});
