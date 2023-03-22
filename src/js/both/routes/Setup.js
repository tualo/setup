Ext.define('Tualo.routes.Setup',{
    url: 'setup',
    handler: {
        action: function(token){
            Ext.getApplication().addView('Tualo.dashboard.view.setup.Panel',true,token);
        },
        before: function (action) {
            Ext.require('Tualo.dashboard.view.setup.Panel',function(){
                action.resume();
            },this)
        }
    }
});