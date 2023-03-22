Ext.define('Ext.cmp.cmp_setup.views.users.View', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.cmp.cmp_setup.models.users.Model',
    'Ext.cmp.cmp_setup.controller.users.Controller',
    'Ext.grid.feature.Grouping'
  ],
  xtype: 'menu-user-grid',
  controller: 'cmp_setup_users_controller',
  viewModel: {
    type: 'cmp_setup_users_model'
  },


  layout: 'card',
  setSetupParam: function(option){
    this.controller.setSetupParam(option);
  },
  items: [{
    title: 'Benutzer',
    xtype: 'grid',
    reference: 'grid',
    listeners: {
      itemdblclick: 'onItemDblClick'
    },
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

      }
    ],
    features: [{
      ftype: 'grouping',
      groupHeaderTpl: '{columnName}: {name} ({rows.length} {[values.rows.length > 1 ? "" : ""]} Benutzer)',
      hideGroupedHeader: true,
      startCollapsed: true
    }],
    plugins:[{
      ptype: 'gridfilters',
      menuFilterText: 'Filter'
    }],
    bind: {
      store: '{users}'
    },
    columns: [
      {
        header: 'Typ',
        dataIndex: 'typ',
        flex: 1,
        filter: {
          type: 'list',
          options: ['master','user','customer']
        }
      },
      {
        header: 'Login',
        dataIndex: 'login',
        flex: 1
      },
      {
        header: 'E-Mail',
        dataIndex: 'email',
        flex: 1
      },
      {
        header: 'Vorname',
        dataIndex: 'vorname',
        flex: 1
      },
      {
        header: 'Nachname',
        dataIndex: 'nachname',
        flex: 1
      },
      {
        header: 'Firma',
        dataIndex: 'clients',
        flex: 1
      },
      {
        header: 'Gruppen',
        dataIndex: 'groups',
        flex: 1
      }

    ]
  },{
    title: 'Benutzer',
    tools: [{
      xtype: 'glyphtool',
      glyph: 'envelope',
      handler: 'onSendPasswordChallange'
    },{
      xtype: 'glyphtool',
      glyph: 'lock',
      handler: 'onAlterPassword'
    }],
    reference: 'form',
    xtype: 'form',
    bodyPadding: 25,
    items: [
      {
        xtype: 'textfield',
        name: 'login',
        fieldLabel: 'Login',
        anchor: '100%',
        readOnly: true
      },
      {
        xtype: 'textfield',
        name: 'vorname',
        fieldLabel: 'Vorname',
        anchor: '100%',
        readOnly: false
      },
      {
        xtype: 'textfield',
        name: 'nachname',
        fieldLabel: 'Nachname',
        anchor: '100%',
        readOnly: false
      },
      {
        xtype: 'textfield',
        name: 'email',
        fieldLabel: 'E-Mail',
        anchor: '100%',
        readOnly: false
      },
      {
        xtype: 'textfield',
        name: 'telefon',
        fieldLabel: 'Telefon',
        anchor: '100%',
        readOnly: false
      },
      {
        xtype: 'tagfield',
        name: 'clients',
        fieldLabel: 'Firmen',
        anchor: '100%',
        readOnly: false,
        valueField: 'client',
        displayField: 'client',
        allowBlank: false,
        queryMode: 'local',
        reference: 'clientfield',
        grow: false,
        bind:{
          store: '{clients}'
        }
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
      }
    ],
    buttons:[
      {
        text: 'Abbrechen',
        handler: 'onCloseClick'
      },'->',{
        text: 'Speichern',
        handler: 'onSaveClick'
      }
    ]

  }]
});
