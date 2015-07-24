/**
 * Created by ww on 2015/3/10.
 */
angular.module('fbs.services')
.factory('Tools', function($state,$ionicHistory,$timeout,$rootScope) {
        var options = {location:true,reload: true};
        var pageSkip = function(url,params){
            $state.go(url,params,options);
        };
        var pageReturn = function(){
            var retObj = $ionicHistory.backView();
            if($ionicHistory.backView()){
                if($state.$current.self.name == "login"){
                    $state.go("index");
                }else{
                    $state.go(retObj.stateName,retObj.stateParams,options);
                }
            }else{
                //页面刷新后返回按钮无效  统一回首页
                $state.go("index");
            }
        };
        var msgShow = function(msg){
            $rootScope.msg_show = true;
            $rootScope.msg_cont = msg;
            $timeout(function() {
              $rootScope.msg_show = false;
            }, 3000);
        };
        var isLogin = function(){
            return true;
        }
        return {
            pageSkip:pageSkip,
            pageReturn:pageReturn,
            msgShow:msgShow,
            isLogin:isLogin
        };
});
