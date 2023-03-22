Ext.define('Tualo.setup.models.menus.TreeModel', {
    extend: 'Ext.data.TreeModel',
    fields: [
      {
        name: 'task',
        type: 'string'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'component',
        type: 'string'
    }, {
        name: 'iconcls',
        type: 'string'
    }, {
        name: 'system',
        type: 'string'
    }, {
        name: 'groups'
    }, {
        name: 'param'
    }, {
        name: 'automenu',
        type: 'boolean'
    }]
});
