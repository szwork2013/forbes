angular.module('fbs.controllers')
.controller('faxianCtrl',function($scope,$state,DataAPI,$sce) {
    $scope.details = function (activityId) {
        $state.go('activity_single',{activityId:activityId});
    };
    $scope.jfphList = DataAPI.get({
        action:'getscoreranklist',
        pagesize:10
    });
    DataAPI.get({
        action:'getnewsdetail',
        newsid: 294991
    }).$promise.then(function(resp) {
            $scope.article  =resp;
        });
    $scope.SkipValidation = function(value) {
        return $sce.trustAsHtml(value);
    };
    $scope.sexy = 1;
});











