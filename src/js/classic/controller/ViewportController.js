Ext.define('Ext.cmp.cmp_setup.controller.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cmp_setup_viewport',
    onSelectionChange: function(tree,records,opt){
      console.log('onSelectionChange',records);
      if (records.length>0){
        this.openItem(records[0]);
      }
    },
    routeToSetup: function(routeParts){
      /*
      console.log('Ext.cmp.cmp_setup.controller.ViewportController','routeToSetup',routeParts)
      var key =  routeParts[0]; routeParts=routeParts.slice(1);
      var param = '';
      var view = '';
      if((routeParts.length>1)&&(routeParts[0]=='_param')){
        param=Ext.util.Base64.decode(routeParts[1]); routeParts=routeParts.slice(2);
      }
      if((routeParts.length>1)&&(routeParts[0]=='_view')){
        view=routeParts[1]; routeParts=routeParts.slice(2);
      }
      if (view==''){
        console.log('STOP NO VIEW');
        return;
      }

      var cards = this.lookupReference('cardContainer');
      if (typeof this.keyMap[key]==='undefined'){
        this.keyMap[key] = Ext.create(view,{

        });
        cards.add(this.keyMap[key]);
      }
      if(typeof this.keyMap[key]==='object'){
        cards.getLayout().setActiveItem(this.keyMap[key]);
      }

      if(typeof this.keyMap[key].setSetupParam === 'function'){
        this.keyMap[key].setSetupParam(param.replace(/---/g,'|'),selection);
      }
*/
    },

    openItem: function(selection){
    
      var key = selection.get('id');
      var param = selection.get('param');
      var root=selection;
      while(typeof root.get('view')!=='string'){
        root = root.parentNode;
        if (root===null){
          return;
        }
      }
      var rootKey = root.get('id');
      var cards = this.lookupReference('cardContainer');
      if (typeof this.keyMap[rootKey]==='undefined'){
        this.keyMap[rootKey] = Ext.create(root.get('view'),{

        });
        cards.add(this.keyMap[rootKey]);
      }
      if(typeof this.keyMap[rootKey]==='object'){
        cards.getLayout().setActiveItem(this.keyMap[rootKey]);
      }

      if(typeof this.keyMap[rootKey].setSetupParam === 'function'){
        this.keyMap[rootKey].setSetupParam(param,selection);
      }
      
    },
    
    keyMap: {},
    onRenderView: function(){
    },
    onBoxReady: function(){
      this.keyMap={};
    }

});
