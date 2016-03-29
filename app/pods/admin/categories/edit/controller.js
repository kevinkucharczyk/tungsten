import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['categoryWithParents'],
  sortedCategories: Ember.computed.sort('filteredCategories', 'sortProps'),

  filteredCategories: Ember.computed.filter('model.categories', function(category) {
    return category.get('id') !== this.get('model.category.id');
  })
});
