Ext.define('Ext.cmp.cmp_setup.controller.menus.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmp_setup_menu_tree',

    onRenderView: function(){
    //  Ext.util.CSS.createStyleSheet('.icon-blue{color: #00a;} .icon-black{color: #000;}','setup_menu_css');
    },
    onSelectionChange: function(model, records) {
      if (records.length>0){
        var rec = records[0];
        var groupsfield=this.lookupReference('groupsfield');
        var menuform=this.lookupReference('menuform');
        menuform.isNew=false;
        var paramField=this.lookupReference('paramfield');
        if (rec) {
          groupsfield.getStore().load({
            params:{
              system: rec.get('system')
            },
            callback: function(){

              paramField.getStore().load({
                params:{
                  forcomponent: rec.get('param')
                },
                callback: function(){
                  menuform.getForm().loadRecord(rec);
                }
              });

            }
          });
        }
      }
    },
    onSystemBoxChanged: function(fld,nv,ov){

      var groupsfield=this.lookupReference('groupsfield');
      groupsfield.getStore().load({
        params:{
          system: nv
        },
        callback: function(records, operation, success) {
          var vals = groupsfield.getValue();
          var res = [];
          var store = groupsfield.getStore();
          for(var i=0;i<vals.length;i++){
              if (store.getById( vals[i] )===null){

              }else{
                res.push(vals[i]);
              }
          }
          groupsfield.setValue(res);
        }
      });


    },
    onComponentBoxChanged: function(fld,nv,ov){
      var paramField=this.lookupReference('paramfield');
      paramField.getStore().load({
        params:{
          forcomponent: nv
        }
      });
    },
    onItemDblClick: function(me,record, item, index, e, eOpts){
      this.lookupReference('menuform').up().getLayout().setActiveItem(this.lookupReference('menuform'));
    },
    onCloseClick: function(){
      this.lookupReference('menu-tree-panel').up().getLayout().setActiveItem(this.lookupReference('menu-tree-panel'));
    },
    onSaveClick: function(){
      var form = this.lookupReference('menuform');
      if (form.isValid()){
        if (form.isNew===false){
          form.getForm().updateRecord();
          this.onCloseClick();
        }else{
          this.view.viewModel.storeInfo.menu.getRoot().appendChild( form.getForm().getValues(),false,true);
          this.onCloseClick();
        }
      }
    },
    add: function(me){
      /*var N=25;
      var newid = Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
      this.view.viewModel.storeInfo.menu.getRoot().appendChild( {
        //id: newid,
        iconcls: 'fa fa-circle',
        title: 'neuer Eintrag',
        component: ''
      },false,true);
      */
      var form = this.lookupReference('menuform');
      var vals = {
        component: "",
        groups: "",
        iconcls: "fa fa-circle icon-black",
        param: "",
        system: "",
        title: "neuer Eintrag"
      };
      form.isNew = true;
      form.getForm().setValues(vals);

      this.lookupReference('menuform').up().getLayout().setActiveItem(this.lookupReference('menuform'));

    },

    remove: function(){
      var tree = this.lookupReference('menu-tree-panel');
      var records = tree.getSelectionModel().getSelection();
      if (records.length>0){
        Ext.MessageBox.confirm('Löschen','Möchten Sie diesen Eintrag wirklich löschen?',function(btn){
          if(btn==='yes'){
            for(var i=0;i<records.length;i++){
              records[i].remove();
            }
          }
        });
      }

    },

    reload: function(){
      this.view.viewModel.storeInfo.menu.load();
    }
});
