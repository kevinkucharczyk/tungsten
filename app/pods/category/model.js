import Ember from 'ember';
import DS from 'ember-data';
import { categoryWithParents } from '../../helpers/category-with-parents';

export default DS.Model.extend({
  title: DS.attr('string'),
  disabled: DS.attr('boolean', { defaultValue: false }),

  parent: DS.belongsTo('category', { inverse: 'subCategories' }),
  subCategories: DS.hasMany('category', { inverse: 'parent' }),

  topLevel: Ember.computed.empty('parent.id'),
  categoryWithParents: Ember.computed('title', function() {
    return categoryWithParents([this]);
  }).volatile()
});
