angular.module("fbs.controllers").controller("activityListCtrl",function($scope,$stateParams,$state,DataAPI){var actionsUrl,operat=$stateParams.operat;actionsUrl="my"==operat?"getmyactivitylist":"getactivitylist",$scope.details=function(activityId){$state.go("activity_single",{activityId:activityId})},$scope.activities=DataAPI.get({action:actionsUrl,pageindex:1,pagesize:10})}).controller("activitySingleCtrl",function($scope,$stateParams,$location,$ionicScrollDelegate,$sce,DataAPI){var activityId=$stateParams.activityId;$scope.activity=DataAPI.get({action:"getactivitydetail",activityid:activityId}),$scope.apply_form={show:!1},$scope.toggle_apply=function(location){$scope.apply_form.show=!$scope.apply_form.show,$scope.apply_form.show&&($location.hash(location),$ionicScrollDelegate.anchorScroll("#"+location))},$scope.SkipValidation=function(value){return $sce.trustAsHtml(value)},$scope.apply_data={activityid:activityId,action:"submitactivitysigndata"},$scope.online_apply=function(){DataAPI.get($scope.apply_data).$promise.then(function(resp){console.log(resp)})}});