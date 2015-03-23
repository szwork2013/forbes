angular.module('fbs.controllers')
.controller('activityListCtrl',function($scope,$stateParams,Tools,DataAPI) {
        var operat = $stateParams.operat;
        var actionsUrl;

        if(operat == 'my'){
            actionsUrl = 'getmyactivitylist';
        }else{
            actionsUrl = 'getactivitylist';
        }
        $scope.details = function (activityId) {
            Tools.pageSkip('activity_single',{activityId:activityId});
        };
        $scope.loading_show = true;
        $scope.activityListReqOptions = {
          action:actionsUrl,
          pageindex:1,
          pagesize:10,
          keyword:''
        };
        $scope.categoryAera = false;
        $scope.ctgListReqOptions = {
          action:'getactivitycategorylist',
          pageindex:1,
          pagesize:10
        };
        $scope.pageDatas = {
          categoryList:DataAPI.get($scope.ctgListReqOptions)
        };
        DataAPI.get($scope.activityListReqOptions)
          .$promise.then(function(req){
            $scope.pageDatas.activityList = req;
            $scope.loading_show = false;
          });

})
.controller('activitySingleCtrl', function($scope,$stateParams,$location,$ionicScrollDelegate,$sce,DataAPI) {
        var activityId = $stateParams.activityId;
        $scope.activity = DataAPI.get({
            action:'getactivitydetail',
            activityid:activityId
        });
        $scope.apply_form={show:false};
        $scope.toggle_apply = function(location) {
            $scope.apply_form.show = !$scope.apply_form.show;
            if($scope.apply_form.show){
                $location.hash(location);
                $ionicScrollDelegate.anchorScroll("#"+location);
            }
        };
        $scope.SkipValidation = function(value) {
            return $sce.trustAsHtml(value);
        };

        $scope.apply_data = {"activityid":activityId,"action":"submitactivitysigndata"};
        //$scope.online_apply = DataAPI.get($scope.apply_data);
        //$scope.apply_data = {};
        $scope.online_apply = function(){
            DataAPI.get($scope.apply_data);
        }
    });










