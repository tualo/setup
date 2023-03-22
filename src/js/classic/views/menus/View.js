Ext.define('Tualo.setup.views.menus.View', {
  extend: 'Ext.panel.Panel',
  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'IconFont.form.field.ComboBox',
    'Tualo.setup.models.menus.Model',
    'Tualo.setup.controller.menus.Controller'
  ],
  xtype: 'menu-tree-grid',
  controller: 'cmp_setup_menu_tree',
  viewModel: {
    type: 'cmp_setup_menu_tree'
  },
  layout: 'card',
  listeners:{
    render: 'onRenderView'
  },
  items: [
    {
      xtype: 'treepanel',
      reserveScrollbar: true,
      reference: 'menu-tree-panel',
      useArrows: true,
      rootVisible: false,
      multiSelect: false,
      singleExpand: true,
      bind: '{menu}',
      title: 'Menü',
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
        selectionchange: 'onSelectionChange',
        itemdblclick: 'onItemDblClick'
      },
      plugins: [/*{
        ptype: 'rowediting',
        clicksToEdit: 2,
        saveBtnText: 'Übernehmen',
        cancelBtnText: 'Abbrechen'
      },{
         ptype: 'gridexporter'
      }*/],
      viewConfig: {
        plugins: {
          ptype: 'treeviewdragdrop',
          containerScroll: true
        },
        listeners:{
          drop: function( node, data, overModel, dropPosition, eOpts ){
            var index = 0;
            var fn = function(item){
              item.set('priority',index);
              index++;
            };
            for(var i=0;i<data.records.length;i++){
              var parentNode = data.records[i].parentNode;
              parentNode.eachChild(fn,true);
            }
          }
        }
      },
      columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: '-',
        dataIndex: 'task',
        sortable: true,
        flex: 1,
        renderer: function(value,meta,rec){
          return '<span class="'+rec.get('iconcls')+'"></span>';
        }

      },{
        //xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Titel',
        dataIndex: 'title',
        sortable: true,
        anchor: '100%',
        flex: 1
      }, {
        xtype: 'gridcolumn',
        text: 'Programm',
        dataIndex: 'component',
        sortable: true,
        anchor: '100%',
        flex: 1
      }, {
        xtype: 'gridcolumn',
        text: 'Gruppen',
        dataIndex: 'groups',
        sortable: true,
        renderer: function(value,meta,record){
          var res = [];
          for(var i=0;i<value.length;i++){
            var p = value[i].split('|');
            res.push(p[1]);
          }
          return res.join(',');
        },
        anchor: '100%',
        flex: 1
      }, {
        xtype: 'gridcolumn',
        text: 'Icon',
        dataIndex: 'iconcls',
        sortable: true,
        anchor: '100%',
        flex: 1,
        renderer: function(value,meta,rec) {
          return '<i class="'+value+'"></i>';
        }
      },{
        xtype: 'gridcolumn',
        text: 'Parameter',
        dataIndex: 'param',
        sortable: true,
        anchor: '100%',
        flex: 1
      },{
        xtype: 'checkcolumn',
        text: 'Automenü',
        dataIndex: 'automenu',
        sortable: true,
        anchor: '100%',
        flex: 1
      }]
    },
    {
      xtype: 'form',
      reference: 'menuform',
      title: 'Bearbeiten',
      bodyPadding: 25,
      items: [
        {
          fieldLabel: 'Titel',
          name: 'title',
          xtype: 'textfield',
          anchor: '100%',
          allowBlank: false
        },{
          fieldLabel: 'Programm',
          name: 'component',
          xtype: 'combobox',
          allowBlank: true,
          anchor: '100%',
          displayField: 'id',
          valueField: 'id',
          bind:{
            store: '{components}'
          },
          listeners: {
            change: 'onComponentBoxChanged'
          }
        },{
          fieldLabel: 'System',
          name: 'system',
          xtype: 'combobox',
          allowBlank: false,
          anchor: '100%',
          displayField: 'name',
          valueField: 'id',
          bind:{
            store: '{system}'
          },
          listeners: {
            change: 'onSystemBoxChanged'
          }
        },{
          fieldLabel: 'Icon',
          name: 'iconcls',
          xtype: 'iconcombo',
          anchor: '100%',
          allowBlank: true
        },{
          fieldLabel: 'Gruppen',
          name: 'groups',
          reference: 'groupsfield',
          xtype: 'tagfield',
          anchor: '100%',
          valueField: 'id',
          displayField: 'name',
          allowBlank: false,
          queryMode: 'local',
          grow: false,
          bind:{
            store: '{groups}'
          }
        },
        {
          fieldLabel: 'Parameter',
          name: 'param',
          xtype: 'tagfield',
          valueField: 'param',
          displayField: 'name',
          anchor: '100%',
          allowBlank: true,
          queryMode: 'local',
          reference: 'paramfield',
          grow: false,
          bind:{
            store: '{parameter}'
          }
        },
        {
          fieldLabel: 'automatisches Menü',
          name: 'automenu',
          anchor: '100%',
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
