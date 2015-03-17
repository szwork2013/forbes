angular.module('fbs.controllers')
.controller('xiaoxiCtrl',function($scope,$stateParams,$state,DataAPI) {
        var operat = $stateParams.operat;
        var actionsUrl;
        if(operat == 'my'){
            actionsUrl = 'getmyquestionnairelist';
        }else{
            actionsUrl = 'getsystemnoticelist';
        }
        $scope.wenjuanList = DataAPI.get({
            action:actionsUrl,
            noticetype:1,
            pageindex:1,
            pagesize:10
        });
        $scope.xtxxList = DataAPI.get({
            action:'getsystemnoticelist',
            noticetype:0,
            pageindex:1,
            pagesize:10
        });
        $scope.wdxtxx = DataAPI.get({
            action:'getunredsystemnoticecount',
            noticetype:0
        });
        //$scope.wdwjxx = DataAPI.get({
        //    action:'getunredsystemnoticecount',
        //    noticetype:1
        //});
})








