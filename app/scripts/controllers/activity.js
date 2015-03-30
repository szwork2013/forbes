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
.controller('activitySingleCtrl', function($rootScope,$scope,$stateParams,$location,$ionicScrollDelegate,$sce,DataAPI,$http) {
        var activityId = $stateParams.activityId;
        var sharetype = 0;
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
        $scope.online_apply = function(){
            DataAPI.get($scope.apply_data);
        }

        $http.jsonp("http://forbes.comeoncloud.net/serv/pubapi.ashx?appid=appid&appsecret=appsecret&action=getactivitydetail&activityid="+activityId+"&callback=JSON_CALLBACK")
            .success(function(data){
               $rootScope.sharedata.title = data.activityname;
               $rootScope.sharedata.imgurl = data.activityimage;
               $rootScope.sharedata.digest = data.activitycontent;
                wx.onMenuShareTimeline({
                    title: $rootScope.sharedata.title, // 分享标题
                    link: location.href, // 分享链接
                    imgUrl: $rootScope.sharedata.imgurl, // 分享图标
                    success: function() {
                        // alert("朋友圈分享成功!!!")
                        sharetype = 3;
                        $rootScope.sharedata.shareSuccess(activityId,sharetype);
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
                        sharetype = 2;
                        $rootScope.sharedata.shareSuccess(activityId,sharetype);
                    },
                    cancel: function() {
                    }
                });
            })
            .error(function(error){
            })

});










