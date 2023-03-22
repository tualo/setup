Ext.define('Tualo.routes.Setup',{
    url: 'setup',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.setup.view.setup.Panel',true,token);
        },
        before: function (action) {
            action.resume();
            /*
            Ext.require('Tualo.setup.view.setup.Panel',function(){
                action.resume();
            },this)*/
        }
    }
});