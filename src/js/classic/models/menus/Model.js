Ext.define('Ext.cmp.cmp_setup.models.menus.Model', {
  extend: 'Ext.app.ViewModel',
  requires:[
    'Ext.cmp.cmp_setup.models.menus.ComponentModel',
    'Ext.cmp.cmp_setup.models.users.GroupsModel',
    'Ext.cmp.cmp_setup.models.menus.TreeModel',
    'Ext.cmp.cmp_setup.models.menus.ParameterModel'
  ],
  alias: 'viewmodel.cmp_setup_menu_tree',
  formulas: {
    selectionText: function(get) {
      var selection = get('treelist.selection'),
        path;
      if (selection) {
        path = selection.getPath('text');
        path = path.replace(/^\/Root/, '');

      }
    }
  },
  stores: {
    groups: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      storeId: 'cmp_setup_store_groups',
      model: 'Ext.cmp.cmp_setup.models.users.GroupsModel',
      pageSize: 10000,
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=groups/read'
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
    parameter: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      storeId: 'cmp_setup_store_params',
      model: 'Ext.cmp.cmp_setup.models.menus.ParameterModel',
      pageSize: 10000,
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=parameter/read'
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
    components: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      storeId: 'cmp_setup_store_components',
      model: 'Ext.cmp.cmp_setup.models.menus.ComponentModel',
      pageSize: 10000,
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=components/read'
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
    system: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      storeId: 'cmp_setup_store_components',
      pageSize: 10000,
      fields: [
        {name: 'id',type:'string'},
        {name: 'name',type:'string'}
      ],
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=system/read'
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
    menu: {
      autoLoad: true,
      autoSync: true,
      type: 'tree',
      model: 'Ext.cmp.cmp_setup.models.menus.TreeModel',
      pageSize: 10000,
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=menu/read',
          update: './index.php?p=menu/update',
          create: './index.php?p=menu/create',
          destroy: './index.php?p=menu/delete'
        },
        extraParams: {
          TEMPLATE: 'NO',
          cmp: 'cmp_setup'
        },
        writer: {
          type: 'json',
          writeAllFields: true,
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
      }
    }
  }
});
