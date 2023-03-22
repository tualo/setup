Ext.define('Tualo.setup.models.users.Model', {
  extend: 'Ext.app.ViewModel',
  requires:[
    'Tualo.setup.models.users.GridModel',
    'Tualo.setup.models.users.ClientsModel',
    'Tualo.setup.models.users.GroupsModel'
  ],
  alias: 'viewmodel.cmp_setup_users_model',
  formulas: {
    selectionText: function(get) {
      //console.log(get);
      /*
      var selection = get('treelist.selection'),
        path;
      if (selection) {
        path = selection.getPath('text');
        path = path.replace(/^\/Root/, '');

      }
      */
    }
  },
  stores: {
    users: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      //groupField: 'typ',
      sorters: ['typ','login'],
      pageSize: 10000,
      model: 'Tualo.setup.models.users.GridModel',
      proxy: {
        type: 'ajax',

        api: {
        
          read: './index.php?p=users/read',
          update: './index.php?p=users/update',
          create: './index.php?p=users/create',
          destroy: './index.php?p=users/delete'
        
        },

        extraParams: {
          
          TEMPLATE: 'NO',
          cmp: 'cmp_setup'

        },
        writer: {
          type: 'json',
          writeAllFields: false,
          rootProperty: 'data'
        },
        reader: {
          type: 'json',
          rootProperty: 'data',
          idProperty: 'login'
        },
        listeners: {
          exception: function(proxy, response, operation) {

          }
        }
      },
      listeners: {
        load: function(me) {

        }
      }
    },
    clients: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      pageSize: 10000,
      model: 'Tualo.setup.models.users.ClientsModel',
      proxy: {
        type: 'ajax',

        api: {
          read: './index.php?p=clients/read'
        },
        extraParams: {
          TEMPLATE: 'NO',
          cmp: 'cmp_setup'
        },
        writer: {
          type: 'json',
          writeAllFields: false,
          rootProperty: 'data'
        },
        reader: {
          type: 'json',
          rootProperty: 'data',
          idProperty: 'id'
        },
        listeners: {
          exception: function(proxy, response, operation) {

          }
        }
      },
      listeners: {
        load: function(me) {

        }
      }
    },
    groups: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      pageSize: 10000,
      model: 'Tualo.setup.models.users.GroupsModel',
      proxy: {
        type: 'ajax',

        api: {
          read: './index.php?p=groups/read'
        },
        extraParams: {
          TEMPLATE: 'NO',
          cmp: 'cmp_setup',
          peruser: '1'
        },
        writer: {
          type: 'json',
          writeAllFields: false,
          rootProperty: 'data'
        },
        reader: {
          type: 'json',
          rootProperty: 'data',
          idProperty: 'id'
        },
        listeners: {
          exception: function(proxy, response, operation) {

          }
        }
      },
      listeners: {
        load: function(me) {

        }
      }
    }
  }
});
