Ext.define('Tualo.setup.models.groups.Model', {
  extend: 'Ext.app.ViewModel',
  requires:[
    'Tualo.setup.models.users.GroupsModel'
  ],
  alias: 'viewmodel.cmp_setup_groups',

  stores: {
    groups: {
      autoLoad: true,
      autoSync: true,
      type: 'store',
      storeId: 'cmp_setup_store_groups',
      model: 'Tualo.setup.models.users.GroupsModel',
      pageSize: 10000,
      listeners: {
        beforeload: function(store,operation){
          var params = store.getProxy().getExtraParams( );
          if (typeof params==='undefined'){
            params = {};
          }
          console.log('store.system',store.system);
          if (typeof params.system==='string'){
            store.system = params.system;
          }else{
            params.system = store.system;
          }
          store.getProxy().setExtraParams(params);
        }
      },
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=groups/read',
          create: './index.php?p=groups/create',
          update: './index.php?p=groups/update',
          destroy: './index.php?p=groups/delete'
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
      }
    }
  }
});
