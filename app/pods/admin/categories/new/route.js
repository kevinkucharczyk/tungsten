import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('category');
  },

  actions: {
    save() {
      let { title, disabled, parent } = this.get('controller').getProperties('title', 'disabled', 'parent');

      let category = this.store.createRecord('category', {
        title: title,
        disabled: disabled,
        parent: parent
      });

      category.save().then(() => {
        this.get('controller').setProperties({
          title: '',
          disabled: false,
          parent: null
        });
        this.transitionTo('admin.categories');
      });
    }
  }
});
