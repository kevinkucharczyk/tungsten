import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      category: this.store.findRecord('category', params.category_id),
      categories: this.store.findAll('category')
    });
  },

  actions: {
    save() {
      let category = this.get('controller.model.category');

      category.save().then(() => {
        this.transitionTo('admin.categories');
      });
    },

    willTransition() {
      let category = this.get('controller.model.category');
      category.rollbackAttributes();
      return true;
    }
  }
});
