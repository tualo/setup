Ext.define('Tualo.setup.models.settings.Model', {
  extend: 'Ext.app.ViewModel',
  requires:[ 'Tualo.setup.models.settings.TreeModel' ],
  alias: 'viewmodel.cmp_setup_settings_model',

  stores:{
    settings: {
      //autoLoad: true,
      autoSync: true,
      type: 'tree',
      pageSize: 10000,
      model: 'Tualo.setup.models.settings.TreeModel',
      listeners: {
        beforeload: 'onBeforeLoad'
      },
      proxy: {
        type: 'ajax',
        /*
        api: {
          read: './ds/view_setup/read',
          update: './ds/view_setup/update',
          create: './ds/view_setup/create',
          destroy: './ds/view_setup/destroy'
        },
        */
        api: {
          read: './index.php?p=settings/read',
          update: './index.php?p=settings/update',
          create: './index.php?p=settings/create',
          destroy: './index.php?p=settings/destroy'
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
