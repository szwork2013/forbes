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
.controller('articleSingleCtrl', function($rootScope,$scope,$http,$stateParams,DataAPI,$sce) {
  var articleId = $stateParams.newsid;
  var sharetype = 0;

  $scope.article = DataAPI.get({
      action:'getnewsdetail',
      newsid:articleId 
  });
  $scope.SkipValidation = function(value) {
      return $sce.trustAsHtml(value);
  };

  $http.jsonp("http://forbes.comeoncloud.net/serv/pubapi.ashx?appid=appid&appsecret=appsecret&action=getnewsdetail&newsid="+articleId+"&callback=JSON_CALLBACK")
    .success(function(data){
       $rootScope.sharedata.title = data.title;
       $rootScope.sharedata.imgurl = data.imgurl;
       $rootScope.sharedata.digest = data.digest;
        wx.onMenuShareTimeline({
            title: $rootScope.sharedata.title, // 分享标题
            link: location.href, // 分享链接
            imgUrl: $rootScope.sharedata.imgurl, // 分享图标
            success: function() {
                // alert("朋友圈分享成功!!!")
                sharetype = 1;
                $rootScope.sharedata.shareSuccess(articleId,sharetype);
            },
            cancel: function() {
            }
        });

        wx.onMenuShareAppMessage({
            title: $rootScope.sharedata.title, // 分享标题
            desc: $rootScope.sharedata.digest, // 分享描述
            link: location.href, // 分享链接
            imgUrl: $rootScope.sharedata.imgurl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // alert("好友分享成功!!!")
                sharetype = 0;
                $rootScope.sharedata.shareSuccess(articleId,sharetype);
            },
            cancel: function() {
            }
        });
    })
    .error(function(error){
    })

})










