angular.module('fbs.controllers')
.controller('wendaListCtrl',function($scope,$state,DataAPI,$stateParams) {
        var operat = $stateParams.operat;
        var ismyask = operat == 'my'?true:false;
        $scope.details = function (wendaId) {
            $state.go('wd_single',{wendaId : wendaId});
        };
        $scope.loading_show = true;

        $scope.wdListReqOptions = {
              action:'getasklist',
              pageindex:1,
              pagesize:10
            };
        DataAPI.get($scope.wdListReqOptions).$promise.then(function(req){
          $scope.wendas = req;
          $scope.loading_show = false;
        });;
})
.controller('wendaSingleCtrl', function($scope,$stateParams,DataAPI,Tools) {
    $scope.wendaId = $stateParams.wendaId;
    $scope.reqOptions = {
      action:'getaskdetail',
      id:$scope.wendaId
    };
    $scope.wenda = DataAPI.get($scope.reqOptions);

    //$scope.reply = function(){
    //    DataAPI.get({
    //      action:'replyask',
    //      id:wendaId,
    //      content:$scope.reply_text
    //    }).$promise.then(function(resp) {
    //        if(resp.errcode == 0){
    //          $scope.reply_text = "";
    //          Tools.msgShow(resp.errmsg);
    //        }else{
    //          console.log(resp.errmsg);
    //          Tools.msgShow(resp.errmsg);
    //        }
    //      });
    //}
})
.controller('wendaAddCtrl', function($scope,$stateParams,$rootScope,DataAPI,Tools) {
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
                    Tools.pageSkip('wd_list', {operat:'all'});
                }else{
                    Tools.msgShow("请登录");
                    Tools.pageSkip('login',null);
                }
            });
        }
        $scope.cancelAdd = function(){
            console.log('取消话题添加');
            Tools.msgShow("请登录");
            Tools.pageReturn();
        }
});










