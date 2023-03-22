Ext.define('Ext.cmp.cmp_setup.controller.groups.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmp_setup_groups',

    onRenderView: function(){
      //Ext.util.CSS.createStyleSheet('.icon-blue{color: blue;} .icon-black{color: blue;}','setup_menu_css');
    },
    onSetupParam: function(p,currentNode){

      var me=this,parts = p.split('|');
      me.currentNode = currentNode;
      if (parts.length===1){
        me.system = parts[0];
      }
      if (parts.length===2){
        me.group = parts[1];
      }

      var params = me.view.viewModel.storeInfo.groups.getProxy().getExtraParams();
      params.system = me.system;
      me.view.viewModel.storeInfo.groups.getProxy().setExtraParams(params);

      if(parts.length===1){
        me.view.viewModel.storeInfo.groups.load({
          callback: function(){
            me.showGrid();
          }
        });
      }else if(parts.length===2){
        var record = this.view.viewModel.storeInfo.groups.getById(parts[1]);
        if (record!==null){
          this.showForm(record);
        }
      }
    },
    showGrid: function(){
      this.lookupReference('grid-panel').up().getLayout().setActiveItem(this.lookupReference('grid-panel'));
    },
    showForm: function(record){
      var form = this.lookupReference('form');
      form.getForm().loadRecord(record);
      form.up().getLayout().setActiveItem(form);
    },
    onItemDblClick: function(me,record, item, index, e, eOpts){
      this.showForm(record);
    },
    onCloseClick: function(){
      this.showGrid();
    },
    onSaveClick: function(){
      var form = this.lookupReference('form');
      if (form.isValid()){
        var record = form.getForm().getRecord();
        if (record.id.indexOf(this.view.viewModel.storeInfo.groups.model.$className)===0){
          var data = form.getForm().getValues();
          record.set(data);
          this.view.viewModel.storeInfo.groups.add(record);
          setTimeout(function(){
            this.reload();
            this.onCloseClick();
          }.bind(this),1000);
        }else{
          form.getForm().updateRecord();
          this.onCloseClick();
        }

        this.refreshNavigationTree();

      }
    },
    refreshNavigationTree: function(){
      setTimeout(function(){
        var node = this.currentNode;
        if (node.get('leaf')){
          node = node.parentNode;
        }
        node.getTreeStore().load({node: node});
      }.bind(this),3000);
    },
    add: function(me){
      var record = Ext.create(this.view.viewModel.storeInfo.groups.model.$className);
      record.set('system',this.system);
      this.showForm(record);
    },

    remove: function(){
      var me = this;
      var grid = this.lookupReference('grid-panel');
      var records = grid.getSelectionModel().getSelection();
      var store = this.view.viewModel.storeInfo.groups;
      Ext.MessageBox.confirm('Löschen','Möchten Sie diesen Eintrag wirklich löschen?',function(btn){
        if(btn==='yes'){
          store.remove(records);
          me.refreshNavigationTree();
        }
      });

    },

    reload: function(){
      this.view.viewModel.storeInfo.groups.load();
    }
});
