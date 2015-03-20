angular.module('fbs.controllers')
.controller('articleListCtrl',function($scope,Tools,DataAPI) {
    $scope.details = function (newsid) {
        Tools.pageSkip('article_single',{newsid : newsid});
    };
    $scope.articleListReqOptions = {
      action:'getnewslist',
      pageindex:1,
      pagesize:10,
      keyword:''
    };
    $scope.categoryAera = false;
    $scope.ctgListReqOptions = {
      action:'getnewscategorylist',
      pageindex:1,
      pagesize:10
    };
    $scope.pageDatas = {
      articleList:DataAPI.get($scope.articleListReqOptions),
      categoryList:DataAPI.get($scope.ctgListReqOptions)
    };
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










