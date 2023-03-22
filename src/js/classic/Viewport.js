Ext.define('Ext.cmp.cmp_setup.Viewport', {
  extend: 'Ext.tualo.ApplicationPanel',
  requires: [
    'IconFont.form.field.ComboBox',
    'Ext.cmp.cmp_setup.models.ViewportModel',
    'Ext.cmp.cmp_setup.controller.ViewportController',
    //'Ext.cmp.cmp_setup.views.*'
    'Ext.cmp.cmp_setup.views.users.View',
    'Ext.cmp.cmp_setup.views.menus.View'
  ],
  layout: {
    type: 'border',
    padding: 5
  },
  controller: 'cmp_setup_viewport',
  viewModel: {
      type: 'cmp_setup_viewport'
  },
  listeners:{
    boxReady: 'onBoxReady'
  },
  routeTo: function(p){
    this.getController().routeToSetup(p);
  },
  items: [
    {
      region: 'west',
      width: 170,
      split: true,
      reference: 'treelistContainer',
      
      border: false,
      scrollable: 'y',
      //cls: 'treelist-with-nav',
      items: [{
        expanderOnly: false,
        rootVisible: false,
        xtype: 'treepanel',
        //reference: 'treelist',
        defaults:{
          indent: 15,
          iconClsProperty: 'iconcls'
        },
        listeners: {
          selectionchange: 'onSelectionChange'
        },
        bind: {
          store: '{navItems}'
        }
      }]
    },
    {
      region: 'center',
      xtype: 'panel',
      layout: 'card',
      reference: 'cardContainer',
      items: [{
        xtype: 'panel',
        html: '<div style="width: 100%; height: 100%; "><p style="margin: 0; font-size: 10em; position: absolute; top: 50%; left: 50%; margin-right: -50%; transform: translate(-50%, -50%)" class="fa fa-gears"></p></div>'
      }]
    }
  ]
});
