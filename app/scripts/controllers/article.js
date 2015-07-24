angular.module('fbs.controllers')
.controller('articleListCtrl',function($rootScope,$scope,Tools,DataAPI) {

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
.controller('articleSingleCtrl', function($scope,$http,$stateParams,DataAPI,$sce) {
  var articleId = $stateParams.newsid;
  var title = "";
  var imgurl = "";
  var digest = "";
  var sharetype = 0;

  // alert("欢迎关注创富荟")
  $http.jsonp("http://forbes.comeoncloud.net/serv/pubapi.ashx?appid=appid&appsecret=appsecret&action=getnewsdetail&newsid="+articleId+"&callback=JSON_CALLBACK")
        .success(function(data){
           title = data.title;
           imgurl = data.imgurl;
           digest = data.digest;
        })
        .error(function(error){
        })

    $scope.article = DataAPI.get({
        action:'getnewsdetail',
        newsid:articleId,
    });
    $scope.SkipValidation = function(value) {
        return $sce.trustAsHtml(value);
    };
  // alert("关注创富荟")



  // alert(navigator.userAgent);

  if(navigator.userAgent.match("MicroMessenger")){
      // alert(0);
  }


  // $http.get("http://" + location.host + "/serv/wxapi.ashx?action=getjsapiconfig&url="+location.href)
  //   .success(function(wxapidata){
  //           wx.config({
  //               debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //               appId: wxapidata.appId, // 必填，公众号的唯一标识
  //               timestamp: wxapidata.timestamp, // 必填，生成签名的时间戳
  //               nonceStr: wxapidata.nonceStr, // 必填，生成签名的随机串
  //               signature:  wxapidata.signature,// 必填，签名，见附录1
  //               jsApiList: [
  //                   "onMenuShareTimeline",
  //                   "onMenuShareAppMessage",
  //                   "onMenuShareQQ"
  //               ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  //           });
  //   })
  //   .error(function(){
  //   });

  //   wx.ready(function(){

  //       wx.onMenuShareTimeline({
  //           title: title, // 分享标题
  //           link: location.href, // 分享链接
  //           imgUrl: imgurl, // 分享图标
  //           success: function() {
  //               // alert("朋友圈分享成功!!!")
  //           },
  //           cancel: function() {
  //               // alert("取消朋友圈分享!!!")
  //           }
  //       });
  //       wx.onMenuShareAppMessage({
  //           title: title, // 分享标题
  //           desc: digest, // 分享描述
  //           link: location.href, // 分享链接
  //           imgUrl: imgurl, // 分享图标
  //           type: '', // 分享类型,music、video或link，不填默认为link
  //           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
  //           success: function() {
  //               // alert("好友分享成功!!!")
  //               sharetype = 0;
  //               $scope.bbb(articleId,sharetype);
  //           },
  //           cancel: function() {
  //               // alert("取消好友分享!!!")
  //           }
  //       });
  //       wx.onMenuShareQQ({
  //           title: title, // 分享标题
  //           desc: digest, // 分享描述
  //           link: location.href, // 分享链接
  //           imgUrl: imgUrl, // 分享图标
  //           success: function() {
  //               // alert("qq分享成功!!!")
  //           },
  //           cancel: function() {
  //               // alert("取消qq分享!!!")
  //           }
  //       });
  //   })
  //  // weixin



   $scope.bbb = function(id,sharetype){
    // alert("id:"+id)
    // alert("sharetype:"+sharetype)

      $http.jsonp("http://forbes.comeoncloud.net/serv/pubapi.ashx?appid=appid&appsecret=appsecret&action=weixinsharecomplete&sharetype="+sharetype+"&id="+id+"&callback=JSON_CALLBACK")
        .success(function(data){
           // alert("yes:"+data.errcode)
           // alert("yes:"+data.errmsg)
        })
        .error(function(error){
           // alert("no:"+data.errcode)
           // alert("no:"+data.errmsg)

        })

        // alert("end....")

   }





});










