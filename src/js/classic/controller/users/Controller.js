Ext.define('Tualo.setup.controller.users.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.cmp_setup_users_controller',


  onSendPasswordChallange: function(){
    
  },

  onAlterPassword: function(){
    var login = this.view.lookupReference('form').getForm().getValues().login;

    var wnd = Ext.create('Ext.tualo.Window',{
      title: 'Kennwort festlegen',
      layout: 'fit',
      percent: 0.5,
      bodyPadding: 25,
      items: [
        {
          xtype: 'form',
          items: [
            {
              xtype: 'textfield',
              name: 'pw1',
              inputType: 'password',
              fieldLabel: 'neues Kennwort',
              anchor: '100%',
              readOnly: false
            },
            {
              xtype: 'textfield',
              name: 'pw2',
              inputType: 'password',
              fieldLabel: 'Kennwort wdh.',
              anchor: '100%',
              readOnly: false
            }

          ],
          buttons:[
            {
              text: 'Kennwort festlegen',
              handler: function(btn){
                var form = btn.up('form');
                var vals = form.getForm().getValues();
                if (vals.pw1!=vals.pw2){
                  Ext.MessageBox.alert('Achtung','Die Passwörter stimmen nicht überein');
                  return;
                }
                Ext.Ajax.request({
                  url: './index.php?p=users/setpw',
                  params: {
                    TEMPLATE: 'NO',
                    cmp: 'cmp_setup',
                    login: login,
                    passwd: vals.pw1
                  },

                  success: function(response, opts) {
                      var obj = Ext.decode(response.responseText);
                      if (obj.success){
                        btn.up('tualowindow').close();
                      }else{
                        Ext.MessageBox.alert('Fehler',obj.msg);
                      }
                  },

                  failure: function(response, opts) {
                      console.log('server-side failure with status code ' + response.status);
                  }
              });
              }
            }
          ]
        }
      ]
    });
    wnd.show();
    wnd.resizeMe();
  },

  onItemDblClick: function( grid, record, item, index, e, eOpts){
    this.lookupReference('form').getForm().loadRecord(record);
    var form = this.lookupReference('form');
    this.view.getLayout().setActiveItem(form);
  },
  onCloseClick: function(){
    var grid = this.lookupReference('grid');
    this.reload();
    this.view.getLayout().setActiveItem(grid);
  },
  onSaveClick: function(){
    var form = this.lookupReference('form');
    //console.log(form.getForm());
    form.getForm().updateRecord();

    var grid = this.lookupReference('grid');
    grid.getStore().sync();

    this.onCloseClick();
  },
  setSetupParam: function(key){
    var grid = this.lookupReference('grid');
    var form = this.lookupReference('form');
    if (typeof key==='string'){
      var rec = grid.getStore().getById(key);
      if (rec!==null){
        form.getForm().loadRecord(rec);
        this.view.getLayout().setActiveItem(form);
      }
    }else{
      this.reload();
      this.view.getLayout().setActiveItem(grid);
    }
  },
  reload: function(){
    var grid = this.lookupReference('grid');
    grid.getStore().load();
  },
  add: function(){

    Ext.MessageBox.prompt(
      "Benutzer anlegen",
      "Geben Sie das neue Login ein", function(btn,txt){
        if ( (btn=='ok') && (txt.length>1) ){
          var form = this.lookupReference('form');
          var grid = this.lookupReference('grid');
          var rec = grid.getStore().insert(0,{
            login: txt,
            typ: 'user',
            email: '',
            telefon: '',
            vorname: '',
            nachname: '',
            groups: [],
            clients: []
          });

          form.getForm().loadRecord(rec[0]);
          this.view.getLayout().setActiveItem(form);
        }
      }, this, false, "" );

//

    /*
    var grid = this.lookupReference('grid');
    var form = this.lookupReference('form');
    form.reset();
    this.view.getLayout().setActiveItem(form);
    */
  },
  remove: function(){
    Ext.MessageBox.confirm('Benutzer entfernen','Möchten Sie den Benutzer wirklich löschen?',function(btn){
      if (btn==='yes'){
        var grid = this.lookupReference('grid');
        var sel = grid.getSelectionModel().getSelection();
        grid.getStore().remove(sel);
      }
    },this);
  }
});
