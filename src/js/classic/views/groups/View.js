Ext.define('Ext.cmp.cmp_setup.views.groups.View', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'IconFont.form.field.ComboBox',
    'Ext.cmp.cmp_setup.models.groups.Model',
    'Ext.cmp.cmp_setup.controller.groups.Controller'
  ],
  xtype: 'groups-panel',
  controller: 'cmp_setup_groups',
  viewModel: {
    type: 'cmp_setup_groups'
  },
  layout: 'card',
  listeners:{
    render: 'onRenderView'
  },
  setSetupParam: function(param,currentNode){
    this.controller.onSetupParam(param,currentNode);
  },
  items: [
    {
      xtype: 'grid',
      reserveScrollbar: true,
      reference: 'grid-panel',
      useArrows: true,
      rootVisible: false,
      multiSelect: false,
      singleExpand: true,
      bind: '{groups}',
      title: 'Gruppen',
      tools: [{
        xtype: 'glyphtool',
        glyphPrefix: 'entypo et-',
        glyph: 'circle-with-plus',
        tooltip: 'Hinzufügen',
        handler: 'add'
      },
      {
        xtype: 'glyphtool',
        glyphPrefix: 'entypo et-',
        glyph: 'circle-with-minus',
        tooltip: 'Entfernen',
        handler: 'remove'

      },
      {
        xtype: 'glyphtool',
        glyphPrefix: 'typcn typcn-arrow-',
        glyph: 'sync',
        tooltip: 'neu Laden',
        handler: 'reload'

      }],
      findEditorElement: function(editor,dataIndex){
        var fields = editor.getEditor().items.items;
        for(var i=0;i<fields.length; i++){
          if (fields[i].dataIndex === dataIndex){
            return fields[i];
          }
        }
      },
      listeners: {
        itemdblclick: 'onItemDblClick'
      },
      columns: [
        {
          text: 'Gruppe',
          dataIndex: 'name',
          sortable: true,
          flex: 1
        },
        {
          xtype: 'checkcolumn',
          text: 'Aktiv',
          dataIndex: 'aktiv',
          sortable: true,
          flex: 1
        }
      ]
    },
    {
      xtype: 'form',
      reference: 'form',
      title: 'Bearbeiten',
      bodyPadding: 25,
      items: [
        {
          fieldLabel: 'Gruppe',
          name: 'name',
          xtype: 'textfield',
          allowBlank: false
        },
        {
          fieldLabel: 'Aktiv',
          name: 'aktiv',
          xtype: 'checkbox'
        }
      ],
      buttons: [{
        text: 'Abbrechen',
        handler: 'onCloseClick'
      },'->',{
        text: 'Speichern',
        handler: 'onSaveClick'
      }]
    }
  ]
});
