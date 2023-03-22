Ext.define('Tualo.setup.controller.settings.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmp_setup_settings_controller',
    onBeforeLoad: function(m,e,o){
      var p = e.getParams();
      if (typeof p==='undefined'){
        p={};
      }
      p.param=this.view.params;
      e.setParams(p);
    },
    onSelect: function(tree, record, index, eOpts ){
      
      this.lookupReference('form').getForm().loadRecord(record);
    },
    onSaveClick: function(){
      this.lookupReference('form').getForm().updateRecord();
    }
});
