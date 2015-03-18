angular.module('fbs.controllers')
.controller('indexCtrl',function($scope,$state,DataAPI,$ionicSlideBoxDelegate,$interval,Tools,$ionicViewService){
        $scope.sliderImgs = DataAPI.get({
            action:'getslide'
        });
        var intervalId = $interval( function() {
            $ionicSlideBoxDelegate.update();
        }, 1000);
        $scope.msgList = DataAPI.get({
            action:'getindexmsglist',
            pageindex:1,
            pagesize:10
        });
        $scope.goItem = function(url,operat){
            Tools.pageSkip(url,{operat:operat});
        }
});












