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
.controller('wendaSingleCtrl', function($rootScope,$scope,$stateParams,$http,DataAPI,Tools) {
    $scope.wendaId = $stateParams.wendaId;
    $scope.reqOptions = {
      action:'getaskdetail',
      id:$scope.wendaId
    };
    $scope.wenda = DataAPI.get($scope.reqOptions);

    $http.jsonp("http://forbes.comeoncloud.net/serv/pubapi.ashx?appid=appid&appsecret=appsecret&action=getaskdetail&id="+$scope.wendaId+"&callback=JSON_CALLBACK")
    .success(function(data){
       $rootScope.sharedata.title = data.ask.title;
       $rootScope.sharedata.imgurl = "http://forbes.comeoncloud.net/customize/forbes/images/t2.png";
       $rootScope.sharedata.digest = data.ask.content;
        wx.onMenuShareTimeline({
            title: $rootScope.sharedata.title, // 分享标题
            link: location.href, // 分享链接
            imgUrl: $rootScope.sharedata.imgurl, // 分享图标
            success: function() {
                // alert("朋友圈分享成功!!!")
                sharetype = 7;
                $rootScope.sharedata.shareSuccess($scope.wendaId,sharetype);
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
                sharetype = 6;
                $rootScope.sharedata.shareSuccess($scope.wendaId,sharetype);
            },
            cancel: function() {
            }
        });
    })
    .error(function(error){
    })

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
                    Tools.msgShow(resp.errmsg);
                    Tools.pageSkip('wd_list', {operat:'all'});
                }else if(resp.errcode == 1){
                    Tools.msgShow("请登录");
                    Tools.pageSkip('login',null);
                }else if(resp.errcode == 2){
                    Tools.msgShow(resp.errmsg);
                }
            });
        }
        $scope.cancelAdd = function(){
            console.log('取消话题添加');
            Tools.msgShow("请登录");
            Tools.pageReturn();
        }
});










