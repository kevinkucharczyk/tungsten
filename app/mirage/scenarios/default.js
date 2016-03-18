export default function(server) {
  var categories = server.createList('category', 10);
  categories.forEach(function(category) {
    var subCategories = server.createList('category', 5, { parent_id: category.id });
    category.subCategories = subCategories.map(attrs => attrs.id);
  });
}
