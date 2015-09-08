import Ember from 'ember';
import LiveExec from './live-exec';

/* globals define */

export default Ember.Component.extend({
  classNames: 'live-exec__output',

  setLiveExecParent: function() {
    this.set('liveExec', this.nearestOfType( LiveExec ));
    if( !this.get('liveExec') ) {
      throw new Error('live-exec-output can only be used inside live-exec');
    }
    this.get('liveExec').signalOutputReady(this);
    this.set('trimmedHandlebars', this.get('liveExec.handlebarsSource') );
  },

  _didInsertElement: Ember.on( 'didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, 'setLiveExecParent');
  }),

  trimmedHandlebars: Ember.computed( 'setLiveExecParent.handlebarsSource', function() {
    // console.log('trimmed');
    // return this.get('docsParent.handlebarsSource');
  }),

  appModuleNamespace: function() {
    // Bit of a hack to get the app's root module namespace so we can put the template in the right place
    return this.toString().split(/@/)[0].substr(1); 
  },

  reRender: function(handlebarsSource, componentSource) {
    try {
      if( componentSource ) {
        var componentDef = "componentDef = { " + componentSource + "};";
        componentDef = eval(componentDef);


        for( var property in componentDef ) {
          if( componentDef.hasOwnProperty( property ) ) {
            if( property == 'actions' ) {
              Ember.merge( this._actions, componentDef[property] );
            }
            else {
              this.set( property, componentDef[property] );
            }
          }
        }
      }

      var precompiledTemplate = Ember.HTMLBars.compile( handlebarsSource );

      var guid = Ember.generateGuid();
      var templateName = `${this.appModuleNamespace()}/templates/${guid}`;

      define(templateName, () => precompiledTemplate);
      this.set('dynamicTemplate', guid);
      this.set('compileError', false);
      this.pruneOldTemplate(templateName);
    }
    catch(e) {
      this.set('compileError', e.message );
    }
  },

  pruneOldTemplate: function(templateName) {
    if (this.get('oldTemplateName')) {
      Ember.run.scheduleOnce('afterRender', this, () => {
        var oldTemplateName = this.get('oldTemplateName');
        delete window.requirejs.entries[templateName];
        this.set('oldTemplateName', oldTemplateName);
      });
    } else {
      this.set('oldTemplateName', templateName);
    }
  },

  actions: {
    // Empty hash (at least) so we can merge into it from componentSource in reRender()

    // IF WE ADD AN ACTION HERE WE NEED TO DETECT COLLISIONS AND REPORT A USEFUL ERROR
  }

});
