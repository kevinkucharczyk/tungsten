import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', function() {
    this.route('categories', function() {
      this.route('new');
      this.route('edit', { path: '/edit/:category_id' });
    });
  });
  this.route('login');
});

export default Router;
