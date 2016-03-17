import Mirage, {faker}  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.commerce.product,
  disabled: false
});
