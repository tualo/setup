<?php
namespace Tualo\Office\Setup\Routes;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;


class User implements IRoute{
    public static function register(){

        Route::add('/setup/user',function(){
            TualoApplication::result('success',false);
        
            TualoApplication::contenttype('application/json');
        },array('get'),false);


    }
}