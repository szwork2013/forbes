angular.module('fbs.controllers')
.controller('signCtrl',function($scope,DataAPI,Tools,$cookieStore) {
        $scope.signInData = {};
        $scope.signInData.action = "login";
        $scope.signInData.userid = "";
        $scope.signInData.pwd = "";
        $scope.login = function(){
            DataAPI.get($scope.signInData).$promise.then(function(resp) {
                console.log(resp);
                if(resp.issuccess){
                    Tools.pageReturn();
                }else{
                    console.log(resp.message);
                }
            });
        };
        $scope.goToRegist = function(){
            Tools.pageSkip('regist');
        };
        $scope.registData = {};
        $scope.registData.action  = 'reg';
        $scope.registData.phone;
        $scope.registData.pwd;
        $scope.registSub = function(){
            DataAPI.get($scope.registData).$promise.then(function(resp) {
                    console.log(resp)
                    if(resp.errcode == 0){
                        alert('注册成功');
                        Tools.pageReturn();
                    }else{
                        alert(resp.errmsg);
                    }
                });
        };
        $scope.reqYzw = function(){
            ;
        };
})








