Ext.define('Tualo.setup.models.users.GroupsModel', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {name: 'id',  type: 'string'},
    {name: 'name',  type: 'string'},
    {name: 'system',  type: 'string'},
    {name: 'aktiv',  type: 'boolean'}
  ]
});
