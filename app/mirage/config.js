import Mirage from 'ember-cli-mirage';

export default function() {
  let bearer = 'MOCKBEARERTOKEN';

  function formToJson(form) {
    var result = {};
    form.split('&').forEach(function(part) {
      var item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }

  this.post('/token', function(db, request){
    var params = formToJson(request.requestBody);
    if(params.username === 'admin' && params.password === 'admin') {
      return {
        'access_token': bearer,
        'token_type': 'bearer'
      };
    } else {
      var body = { errors: 'Username or password is invalid' };
      return new Mirage.Response(401, {}, body);
    }
  });

  this.get('/api/users/me', function(db, request){
    if(request.requestHeaders.Authorization === 'Bearer ' + bearer) {
      return {
        data: {
          type: 'users',
          id: 1,
          attributes: {
            name: 'Admin',
            email: 'admin@admin.com'
          }
        }
      };
    } else {
      return new Mirage.Response(401, {}, {});
    }
  });

  this.get('/api/categories/:id', function(db, request) {
    let id = request.params.id;
    let attrs = db.categories.find(id);

    var category = {
      type: 'categories',
      id: request.params.id,
      attributes: attrs
    };

    var relationships = {};

    if(attrs.parent_id) {
      relationships.parent = {
        data: {
          type: 'category',
          id: attrs.parent_id
        }
      };

      category.relationships = relationships;
    }

    return {
      data: category
    };
  });

  this.patch('/api/categories/:id', function(db, request) {
    let id = JSON.parse(request.requestBody).data.id;
    let attrs = JSON.parse(request.requestBody).data.attributes;
    let relationships = JSON.parse(request.requestBody).data.relationships;

    let dbCategory = db.categories.update(id, attrs);

    console.log(relationships);

    if(relationships && relationships.parent && relationships.parent.data) {
      dbCategory = db.categories.update(id, { parent_id: relationships.parent.data.id });
    } else {
      dbCategory = db.categories.update(id, { parent_id: null });
    }

    let category = {
      type: 'categories',
      id: id,
      attributes: attrs
    };

    if(dbCategory.parent_id) {
      category.relationships = {
        parent: {
          data: {
            type: 'category',
            id: dbCategory.parent_id
          }
        }
      };
    }

    return {
      data: category
    };
  });

  this.get('/api/categories', function(db) {
    return {
      data: db.categories.map(attrs => {
        var category = {
          type: 'categories',
          id: attrs.id,
          attributes: attrs
        };
        var relationships = {};
        var hasRelationships = false;

        if(attrs.parent_id) {
          relationships.parent = {
            data: {
              type: 'category',
              id: attrs.parent_id
            }
          };
          hasRelationships = true;
        }

        var subCategories = db.categories.filter(subAttrs => {
          return subAttrs.parent_id === attrs.id;
        }).map(subAttrs => ({
          type: 'category',
          id: subAttrs.id
        }));

        if(subCategories) {
          relationships.subCategories = {
            data: subCategories
          };
          hasRelationships = true;
        }

        if(hasRelationships) {
          category.relationships = relationships;
        }

        return category;
      })
    };
  });

  this.post('/api/categories', function(db, request) {
    var attrs = JSON.parse(request.requestBody).data.attributes;
    var relationships = JSON.parse(request.requestBody).data.relationships;

    var newCategory = {
      title: attrs.title,
      disabled: attrs.disabled
    };

    if(relationships.parent.data) {
      newCategory.parent_id = relationships.parent.data.id;
    }

    var dbCategory = db.categories.insert(newCategory);

    var category = {
      type: 'categories',
      id: dbCategory.id,
      attributes: attrs
    };

    if(newCategory.parent_id) {
      category.relationships = {
        parent: {
          data: {
            type: 'category',
            id: newCategory.parent_id
          }
        }
      };
    }

    return {
      data: category
    };
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
