import Ember from 'ember';
import { categoryWithParents } from 'tungsten/helpers/category-with-parents';
import { module, test } from 'qunit';

module('Unit | Helper | category with parents');

const topLevelCategory = Ember.Object.create({
  title: 'Top Level',
  topLevel: true
});

const secondLevelCategory = Ember.Object.create({
  title: '2nd Level',
  topLevel: false,
  parent: topLevelCategory
});

const thirdLevelCategory = Ember.Object.create({
  title: '3rd Level',
  topLevel: false,
  parent: secondLevelCategory
});

test('renders topLevel title', function(assert) {
  let result = categoryWithParents([topLevelCategory]);
  assert.equal(result, topLevelCategory.get('title'));
});

test('renders child title with parent title', function(assert) {
  let result = categoryWithParents([secondLevelCategory]);
  assert.equal(result, topLevelCategory.get('title') + '/' + secondLevelCategory.get('title'));
});

test('renders doubly nested child title', function(assert) {
  let result = categoryWithParents([thirdLevelCategory]);
  assert.equal(result, topLevelCategory.get('title') + '/' + secondLevelCategory.get('title') + '/' + thirdLevelCategory.get('title'));
});