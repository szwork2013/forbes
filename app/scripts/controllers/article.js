angular.module('fbs.controllers')
.controller('articleListCtrl',function($scope,Tools,DataAPI) {
    $scope.details = function (newsid) {
        Tools.pageSkip('article_single',{newsid : newsid});
    };
    $scope.loading_show = true;
    $scope.loading_show = true;
    $scope.articleListReqOptions = {
      action:'getnewslist',
      pageindex:1,
      pagesize:10,
      keyword:''
    };
    $scope.ctgListReqOptions = {
      action:'getnewscategorylist',
      pageindex:1,
      pagesize:10
    };
    $scope.pageDatas = {
      currentCateId:9999,
      categoryList:DataAPI.get($scope.ctgListReqOptions)
    };
    DataAPI.get($scope.articleListReqOptions)
      .$promise.then(function(req){
        $scope.pageDatas.articleList = req;
        $scope.loading_show = false;
      });
})
.controller('articleSingleCtrl', function($scope,$stateParams,DataAPI,$sce) {
    var articleId = $stateParams.newsid;
    $scope.article = DataAPI.get({
        action:'getnewsdetail',
        newsid:articleId
    });
    $scope.SkipValidation = function(value) {
        return $sce.trustAsHtml(value);
    };

});










