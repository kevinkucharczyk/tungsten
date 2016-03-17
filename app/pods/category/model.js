import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  disabled: DS.attr('boolean', { defaultValue: false }),

  parent: DS.belongsTo('category', { inverse: 'subCategories' }),
  subCategories: DS.hasMany('category', { inverse: 'parent' })
});
