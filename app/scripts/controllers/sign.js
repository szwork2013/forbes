angular.module('fbs.controllers')
.controller('signCtrl',function($scope,DataAPI,Tools,$cookieStore) {
        $scope.signInData = {};
        $scope.signInData.action = "login";
        $scope.signInData.userid = "15351998091";
        $scope.signInData.pwd = "123456";
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
        $scope.registData.phone  = 18573619055;
        $scope.registData.pwd  = '123';
        $scope.registSub = function(){
            DataAPI.get($scope.registData).$promise.then(function(resp) {
                    if(resp.errcode == 0){
                        console.log('注册成功');
                        Tools.pageReturn();
                    }else{
                        console.log('注册失败');
                        console.log(resp.errmsg);
                    }
                });
        };
        $scope.reqYzw = function(){
            ;
        };
})








