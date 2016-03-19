import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('category', 'Unit | Model | category', {
  needs: []
});

test('correctly identifies top level category', function(assert) {
  const topLevelCategory = this.subject({
    title: 'Top Level'
  });

  assert.ok(topLevelCategory.get('topLevel'));
});

test('correctly identifies non top level category', function(assert) {
  let topLevelCategory;
  let secondLevelCategory;

  Ember.run(() => {
    topLevelCategory = this.store().createRecord('category', {
      id: 1,
      title: 'Top Level'
    });

    secondLevelCategory = this.store().createRecord('category', {
      title: '2nd Level',
      parent: topLevelCategory
    });
  });

  assert.notOk(secondLevelCategory.get('topLevel'));
});
