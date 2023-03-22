Ext.define('Ext.cmp.cmp_setup.models.users.GridModel', {
  extend: 'Ext.data.Model',
  idProperty: 'login',
  fields: [
    { name: 'login',    type: 'string'},
    { name: 'typ',      type: 'string'},
    { name: 'email',    type: 'string'},
    { name: 'telefon',    type: 'string'},
    { name: 'vorname',  type: 'string'},
    { name: 'nachname', type: 'string'},
    { name: 'groups' },
    { name: 'clients' }
  ]
});
