angular.module('fbs.controllers')
.controller('personCtrl',function($scope,$state,$cookieStore,DataAPI,Tools){
    DataAPI.get({
        action:'getcurrentuserinfo'
    }).$promise.then(function(resq){
        if(resq.errcode = -2 && !resq.totalscore){
          Tools.pageSkip('login');
        }else{
          $scope.personinf = resq;
        }
    });
    $scope.gxzl = function(){
        DataAPI.get({
            action:'updatecurrentuserinfo',
            truename:$scope.personinf.truename,
            postion:$scope.personinf.postion,
            company:$scope.personinf.company
        });
        $scope.$apply();
    }
    $scope.wdjf = DataAPI.get({
        action:'getscorerecordlist',
        pageindex:1,
        pagesize:10
    });
    $scope.redir = function(url,p){
        $state.go(url, {operat:p}, {location:true,reload: true});
    }
    $scope.logout=function(){
        var logoutdata={
            action : "loginout"
        };
        DataAPI.get(logoutdata).$promise.then(function(resp) {
            if(!resp.errcode){
                $state.go("login");
            }
        });



    }
});












