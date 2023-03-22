Ext.define('Ext.cmp.cmp_setup.controller.software.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmp_setup_software_controller',

    onRenderView: function(){
      //Ext.util.CSS.createStyleSheet('.icon-blue{color: blue;} .icon-black{color: blue;}','setup_menu_css');
    },


    onSetupParam: function(p,currentNode){

      var me=this;
      me.currentNode = currentNode;
      if (p){
        var parts = p.split('|');
        if (parts.length===1){
          me.system = parts[0];
        }
        if (parts.length===2){
          me.group = parts[1];
        }
      }
    },
    showGrid: function(){
      var grid = this.lookupReference('grid');
      grid.up().getLayout().setActiveItem(grid);
      grid.getStore().load();
      console.log('here showGrid');
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
        if (!Ext.isEmpty(node)){
          if (node.get('leaf')){
            node = node.parentNode;
          }

          if ( Ext.isEmpty(node) || (node.id=='root')){
            var s=this.currentNode.getTreeStore();
            s.getRootNode().removeAll();
            s.load();
          }else{
            node.getTreeStore().load({node: node});
          }
        }

      }.bind(this),3000);
    },
    add: function(me){

    },
    checkUpdates: function(){
      var me = this;
      var grid = this.lookupReference('grid');
      var records = grid.getSelectionModel().getSelection();
      if (records.length>0){
        this.loopCheckUpdates(records);
      }
    },
    loopCheckUpdates: function(records){
      if (records.length>0){
        var record = records.shift();
        this.checkUpdate(record,function(){
          this.loopCheckUpdates(records);
        }.bind(this));
      }
    },

    checkUpdate: function(record,cb){
      Tualo.Ajax.request({
        url: './index.php?',
        params: {
          cmp: 'cmp_setup',
          p: 'software/repo/query',
          package: record.get('id')
        },
        showWait: true,
        json: function(o){
          if (o.success===true){
            var newversion = null;
            o.versions.forEach(function(item){
              console.log(record.get('id'),record.get('version').trim()<item.version,'current',record.get('version').trim(),'remote',item.version);
              if (record.get('version').trim()<item.version){
                if (newversion==null){
                  newversion = item;
                }
                if (newversion.version<item.version){
                  newversion = item;
                }

              }else{
                console.log(record.get('id'),record.get('version').trim()<item.version);
              }
            });
            if (newversion!=null){
              record.set('newversion',newversion.version);
            }
            console.log('newversion',newversion);

          }
          if (typeof cb=='function'){
            cb();
          }
          console.log('checkUpdate',o);
        }
      });
    },
    update: function(){
      var me = this;
      var grid = this.lookupReference('grid');
      var records = grid.getSelectionModel().getSelection();
      var store = this.view.viewModel.storeInfo.software;
      Ext.MessageBox.confirm('Aktualisieren','Möchten Sie diesen Eintrag wirklich aktualisieren?',function(btn){
        if(btn==='yes'){
          Ext.Ajax.request({
            url: 'index.php',
            timeout: 600000,
            params: {
              cmp: 'cmp_setup',
              TEMPLATE: 'NO',
              p: 'software/package_update',
              id: records[0].get('id')
            },
            success: function(response){
              var text = response.responseText;
              try{
                var o = Ext.JSON.decode(text);
                if (o.success){

                }else{
                  Ext.MessageBox.alert('Fehler',o.msg);
                }
              }catch(e){
                Ext.MessageBox.alert('Fehler',text+e);
              }
            },
            failure: function(){
              Ext.MessageBox.alert('Fehler','Der Server antwortete fehlerhaft');
            }
          });
          //store.remove(records);
          //me.refreshNavigationTree();
        }
      });
    },
    remove: function(){
      var me = this;
      var grid = this.lookupReference('grid');
      var records = grid.getSelectionModel().getSelection();
      var store = this.view.viewModel.storeInfo.software;
      Ext.MessageBox.confirm('Löschen','Möchten Sie diesen Eintrag wirklich löschen?',function(btn){
        if(btn==='yes'){
          store.remove(records);
          me.refreshNavigationTree();
        }
      });

    },

    reload: function(){
      this.view.viewModel.storeInfo.software.load();
    },

});
