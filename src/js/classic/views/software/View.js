Ext.define('Tualo.setup.views.software.View', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Tualo.setup.models.software.Model',
    'Tualo.setup.controller.software.Controller',
    'Ext.grid.feature.Grouping'
  ],
  xtype: 'software-grid',
  controller: 'cmp_setup_software_controller',
  viewModel: {
    type: 'cmp_setup_software_model'
  },


  layout: 'card',
  setSetupParam: function(param,currentNode){
    this.controller.onSetupParam(param,currentNode);
  },
  items: [{
    title: 'Programme',
    xtype: 'grid',
    reference: 'grid',
    listeners: {
      itemdblclick: 'onItemDblClick'
    },
    tools: [{
        xtype: 'glyphtool',
        glyphPrefix: 'entypo et-',
        glyph: 'circle-with-plus',
        tooltip: '----',
        handler: 'checkUpdates'
      },



      {
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
      }
    ],
    plugins:[{
      ptype: 'gridfilters',
      menuFilterText: 'Filter'
    }],
    bind: {
      store: '{software}'
    },
    selModel: {
      mode: 'MULTI'
    },
    columns: [
      {
        header: 'Name',
        dataIndex: 'name',
        flex: 1
      },
      {
        header: 'Version',
        dataIndex: 'version',
        flex: 1
      },
      {
        header: 'neue Version',
        dataIndex: 'newversion',
        flex: 1
      },
      {
        header: 'Gruppen',
        dataIndex: 'groups',
        flex: 1,
        renderer: function(value,meta,record){
          var res = [];
          for(var i=0;i<value.length;i++){
            var p = value[i].split('|');
            res.push(p[1]);
          }
          return res.join(',');
        }
      }
    ]
  },{
    title: 'Programm',
    reference: 'form',
    xtype: 'form',
    bodyPadding: 25,
    items: [
      {
        xtype: 'textfield',
        name: 'name',
        fieldLabel: 'Name',
        anchor: '100%',
        readOnly: true
      },
      {
        xtype: 'tagfield',
        name: 'groups',
        fieldLabel: 'Gruppen',
        anchor: '100%',
        readOnly: false,

        valueField: 'id',
        displayField: 'name',
        allowBlank: true,
        queryMode: 'local',
        reference: 'groupfield',
        grow: false,
        bind:{
          store: '{groups}'
        }
      },

      {
        xtype: 'textfield',
        name: 'version',
        fieldLabel: 'Version',
        anchor: '100%',
        readOnly: true
      },
      {
        xtype: 'textarea',
        name: 'license',
        fieldLabel: 'Lizenz',
        anchor: '100% -100',
        readOnly: true
      }
    ],
    buttons:[
      {
        text: 'Abbrechen',
        handler: 'onCloseClick'
      },{
        text: 'Aktualisieren',
        handler: 'update'
      },'->',{
        text: 'Speichern',
        handler: 'onSaveClick'
      }
    ]

  }]
});
