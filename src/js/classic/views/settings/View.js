Ext.define('Ext.cmp.cmp_setup.views.settings.View', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.cmp.cmp_setup.models.settings.Model',
    'Ext.cmp.cmp_setup.controller.settings.Controller'
  ],
  xtype: 'settings-form',
  controller: 'cmp_setup_settings_controller',
  viewModel: {
    type: 'cmp_setup_settings_model'
  },


  layout: 'border',
  setSetupParam: function(option){
    this.params = option;
    var tree = this.lookupReference('tree');
    var root = tree.getRootNode();
    tree.getStore().load();
  },
  items: [
    {
      region: 'west',
      split: true,
      rootVisible: false,
      width: 200,
      xtype: 'treepanel',
      reference: 'tree',
      bind: {
        store: '{settings}'
      },
      listeners:{
        select: 'onSelect'
      },
      columns:[{
          flex: 1,
          xtype: 'treecolumn',
          treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
              var me = this,
                  cls = record.get('value'),
                  rendererData;

              rendererData = me.initTemplateRendererData(value, metaData, record, rowIdx, colIdx, store, view);
              if (cls) {
                  rendererData.value = '<b>'+record.get('text')+'</b>';
              }else{
                rendererData.value = record.get('text');
              }
              return me.getTpl('cellTpl').apply(rendererData);
          }
        }
      ]
    },
    {
    region: 'center',
    title: 'Einstellungen',
    reference: 'form',
    xtype: 'form',
    bodyPadding: 25,
    items: [
      {
        xtype: 'hidden',
        name: 'id'
      },
      {
        fieldLabel: 'Schlüssel',
        xtype: 'textfield',
        readOnly: true,
        name: 'text',
        anchor: '100%'
      },
      {
        fieldLabel: 'Wert',
        xtype: 'textarea',
        name: 'value',
        anchor: '100% -100'
      }
    ],
    buttons:[
      '->',{
        text: 'Speichern',
        handler: 'onSaveClick'
      }
    ]

  }]
});
