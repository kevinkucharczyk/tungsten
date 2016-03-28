import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['categoryWithParents'],
  sortedCategories: Ember.computed.sort('model.categories', 'sortProps')
});
