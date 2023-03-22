Ext.define('Tualo.setup.models.settings.TreeModel', {
    extend: 'Ext.data.TreeModel',
    fields: [
      {
          name: 'title',
          type: 'string'
      },{
          name: 'param',
          type: 'string'
      }, {
        name: 'value',
        type: 'string'
    }]
});
