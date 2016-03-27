import Ember from 'ember';

export function categoryWithParents(params) {
  let category = params[0];
  let currentTitle = params[1] ? params[1] : category.get('title');
  let isTopLevel = category.get('topLevel');
  if(isTopLevel) {
    return currentTitle;
  }
  return categoryWithParents([category.get('parent'), category.get('parent.title') + ' > ' + currentTitle]);
}

export default Ember.Helper.helper(categoryWithParents);
