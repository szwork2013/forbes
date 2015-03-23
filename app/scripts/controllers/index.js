angular.module('fbs.controllers')
.controller('indexCtrl',function($scope,$state,DataAPI,$ionicSlideBoxDelegate,$interval,Tools,$ionicViewService){
        $scope.sliderImgs = DataAPI.get({
            action:'getslide'
        });
         $interval( function() {
            $ionicSlideBoxDelegate.update();
        }, 1000);
        $scope.msgListReqOptions = {
          action:'getindexmsglist',
          pageindex:1,
          pagesize:10,
          sort:'time'
        };
        $scope.loading_show = true;
        DataAPI.get($scope.msgListReqOptions)
          .$promise.then(function(req){
            $scope.msgList = req;
            $scope.loading_show = false;
        });
        $scope.goItem = function(url,operat){
                Tools.pageSkip(url,{operat:operat});
        }
});












