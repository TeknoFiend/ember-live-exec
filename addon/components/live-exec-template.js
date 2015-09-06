import Ember from 'ember';
import LiveExec from './live-exec';

export default Ember.Component.extend({
  classNames: 'live-exec__template',

  setLiveExecParent: function() {
    this.set('liveExec', this.nearestOfType( LiveExec ));
    if( !this.get('liveExec') ) {
      throw new Error('live-exec-template can only be used inside live-exec');
    }
    this.set('source', this.get('source').trim());
    this.get('liveExec').signalTemplateReady(this); //Source( this.get('source') );
  },

  _didInsertElement: Ember.on( 'didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, 'setLiveExecParent');
  })

});
