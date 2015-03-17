/**
 * Created by ww on 2015/3/10.
 */
angular.module('fbs.services')
.factory('Tools', function($state,$ionicHistory) {
        var options = {location:true,reload: true};
        var pageSkip = function(url,params){
            $state.go(url,params,options);
        };
        var pageReturn = function(){
            //$ionicHistory.goBack();
            //console.log($ionicHistory.viewHistory());
            //console.log($ionicHistory.backView());
            var retObj = $ionicHistory.backView();
            if($ionicHistory.backView()){
                $state.go(retObj.stateName,retObj.stateParams,options);
            }else{
                $ionicHistory.goBack();
            }
        }
        return {
            pageSkip:pageSkip,
            pageReturn:pageReturn
        };
});
