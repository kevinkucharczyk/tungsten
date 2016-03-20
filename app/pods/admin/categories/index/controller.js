import Ember from 'ember';

export default Ember.Controller.extend({
  topLevelCategories: Ember.computed('model.[]', function() {
    return this.get('model').filter(item => item.get('topLevel'));
  })
});
