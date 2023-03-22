Ext.define('Ext.cmp.cmp_setup.models.software.Model', {
  extend: 'Ext.app.ViewModel',
  requires:[
    'Ext.cmp.cmp_setup.models.software.SoftwareModel'
  ],
  alias: 'viewmodel.cmp_setup_software_model',

  stores: {
    groups: {
      autoLoad: true,
      autoSync: true,
      type: 'json',
      pageSize: 10000,
      model: 'Ext.cmp.cmp_setup.models.users.GroupsModel',
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
    },
    software: {
      autoLoad: true,
      autoSync: true,
      type: 'store',
      model: 'Ext.cmp.cmp_setup.models.software.SoftwareModel',
      pageSize: 10000,
      listeners: {
        beforeload: function(store,operation){
          /*
          var params = store.getProxy().getExtraParams( );
          if (typeof params==='undefined'){
            params = {};
          }
          if (typeof params.system==='string'){
            store.system = params.system;
          }else{
            params.system = store.system;
          }
          store.getProxy().setExtraParams(params);
          */
        }
      },
      proxy: {
        type: 'ajax',
        api: {
          read: './index.php?p=software/read',
          create: './index.php?p=software/create',
          update: './index.php?p=software/update',
          destroy: './index.php?p=software/delete'
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
        }
      }
    }
  }
});
