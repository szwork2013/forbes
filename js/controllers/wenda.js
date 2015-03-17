angular.module('fbs.controllers')
.controller('wendaListCtrl',function($scope,$state,DataAPI,$stateParams) {
        var operat = $stateParams.operat;
        var ismyask = operat == 'my'?true:false;
        $scope.details = function (wendaId) {
            $state.go('wd_single',{wendaId : wendaId});
        };
        $scope.wendas = DataAPI.get({
                action:'getasklist',
                pageindex:1,
                pagesize:10
        });
})
.controller('wendaSingleCtrl', function($scope,$stateParams,DataAPI) {
    var wendaId = $stateParams.wendaId;
    $scope.wenda = DataAPI.get({
        action:'getaskdetail',
        id:wendaId
    });
})
.controller('wendaAddCtrl', function($scope,$stateParams,DataAPI,Tools) {
        var touserid;
        if($stateParams.touserid != 'none'){
            touserid = $stateParams.touserid
        }
        $scope.wenda = {};
        $scope.addWenda = function(){
            DataAPI.get({
                action:'addask',
                title:$scope.wenda.titles,
                content:$scope.wenda.content,
                touserid:touserid
            }).$promise.then(function(resp) {
                if(resp.errcode == 0){
                    console.log("话题添加成功");
                    Tools.pageSkip('wd_list', {operat:'all'});
                }else if(resp.errcode == 1){
                    console.log("尚未登录");
                    Tools.pageSkip('login',null);
                }
            });
        }
        $scope.cancelAdd = function(){
            console.log('取消话题添加');
            Tools.pageReturn();
        }
});










