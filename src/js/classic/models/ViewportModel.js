Ext.define('Tualo.setup.models.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cmp_setup_viewport',
   
    stores: {
        navItems: {
          autoLoad: true,
          autoSync: false,
          type: 'tree',
          proxy: {
            type: 'ajax',
            pageSize: 10000,
            api: {
              //read: './setup/nav'
              read: './index.php?TEMPLATE=NO&p=nav/read&cmp=cmp_setup'
            },
            writer: {
              type: 'json',
              writeAllFields: true,
              root: 'data',
            },
            reader: {
              type: 'json',
              rootProperty: 'data',
              idProperty: 'id'
            },
            listeners: {
              exception: function(proxy, response, operation){
                /*
                var o,msg;
                try{
                  o = Ext.JSON.decode(response.responseText);
                  msg = o.msg;
                }catch(e){
                  msg = response.responseText;
                }
                Ext.MessageBox.show({
                  title: 'Fehler',
                  msg: msg,
                  icon: Ext.MessageBox.ERROR,
                  buttons: Ext.Msg.OK
                });
                */
              }
            }
          }
        }
    }
});
