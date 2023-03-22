Ext.define('Tualo.setup.models.software.SoftwareModel', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {name: 'id',  type: 'string'},
    {name: 'name',  type: 'string'},
    {name: 'version',  type: 'string'},
    {name: 'newversion',  type: 'string'},
    {name: 'license',  type: 'string'},
    {name: 'groups'}
  ]
});
