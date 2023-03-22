Ext.define('Tualo.setup.models.menus.ParameterModel', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {name: 'id',  type: 'string'},
    {name: 'name',  type: 'string'},
    {name: 'param',  type: 'string'}
  ]
});
