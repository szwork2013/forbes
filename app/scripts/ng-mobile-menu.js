angular.module('shoppinpal.mobile-menu', [])
    .run(['$rootScope', '$spMenu', function($rootScope, $spMenu){
        $rootScope.$spMenu = $spMenu;
    }])
    .provider("$spMenu", function(){
        this.$get = [function(){
           var menu = {};

           menu.show = function show(selector){
               var menu = angular.element(document.querySelector('#'+selector));
               menu.addClass('show');
           };

           menu.hide = function hide(selector){
               var menu = angular.element(document.querySelector('#'+selector));
               menu.removeClass('show');
           };

           menu.toggle = function toggle(selector) {
                var menu = angular.element(document.querySelector('#'+selector));
                menu.toggleClass('show');
           };

           return menu;
        }];
    });
