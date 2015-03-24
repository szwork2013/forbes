angular.module('fbs.controllers')
.controller('licaishiListCtrl',function($scope,Tools,DataAPI,$stateParams,AtteLcs) {
        var operat = $stateParams.operat;
        var actionsUrl;
        if(operat == 'myatt'){
            actionsUrl = 'getmyattentionlist';
        }else if (operat == 'myfans'){
            actionsUrl = 'getmyfanslist';
        }else{
            actionsUrl = 'getmasterlist';
        }
        $scope.loading_show = true;

        $scope.lcsListReqOptions = {
            action:actionsUrl,
            pageindex:1,
            pagesize:10,
            sort:'time',
            keyword:''
        };
        $scope.categoryAera = false;
        $scope.ctgListReqOptions = {
            action:'getmastertaglist',
            pageindex:1,
            pagesize:10
        };
        $scope.pageDatas = {
            categoryList:DataAPI.get($scope.ctgListReqOptions)
        };
        DataAPI.get($scope.lcsListReqOptions)
          .$promise.then(function(req){
            $scope.pageDatas.licaishiList = req;
            $scope.loading_show = false;
          });
        $scope.details = function (licaishiId) {
          Tools.pageSkip('licaishi_single',{licaishiId:licaishiId});
        };
        $scope.atteLcs = function (licaishi, $event) {
            if ($event.stopPropagation) $event.stopPropagation();
            AtteLcs.atte(licaishi);
        };
})
.controller('licaishiSingleCtrl',function($scope,Tools,$stateParams,DataAPI,AtteLcs) {
    var licaishiId = $stateParams.licaishiId;
    $scope.licaishi = DataAPI.get({
        action : 'getmasterdetail',
        userid : licaishiId
    });
    $scope.zixun = function (touserid) {
      Tools.go('wd_add',{touserid:licaishiId});
    };
    $scope.atteLcs = function (licaishi) {
      AtteLcs.atte(licaishi);
    };
})
.controller('licaishiOtherCtrl',function($scope,DataAPI) {
        var activityId = 291504;
        $scope.apply_data = {};
        $scope.apply_data.K1 = 1;
        DataAPI.get({
            action:'getactivitydetail',
            activityid:activityId
        }).$promise.then(function(resp) {
                $scope.applyForm = resp;
                console.log($scope.applyForm.signfield);
            });
        $scope.apply_data.activityid=activityId;
        $scope.apply_data.action="submitactivitysigndata";
        $scope.online_apply = function(){
            DataAPI.get($scope.apply_data)
                .$promise.then(function(resp) {
                    console.log(resp);
                });
        }
})
.controller('licaishiHistoryCtrl',function($scope,DataAPI) {
    $scope.articleListReqOptions = {
      action:'getnewslist',
      ca:499,
      pageindex:1,
      pagesize:10,
      keyword:''
    };
    $scope.pageDatas =  {};
    $scope.loading_show = true;
    DataAPI.get($scope.articleListReqOptions)
      .$promise.then(function(req){
        $scope.pageDatas.articleList = req;
        $scope.loading_show = false;
      });
        //DataAPI.get({
        //  action:'getmasternumberlist'
        //}).$promise.then(function(resp) {
        //    $scope.jieshu = resp;
        //    $scope.currentJ = resp.totalcount - 2;
        //});
        //$scope.lcsListReqOptions = {
        //    action:'getmasterlist',
        //    pageindex:1,
        //    pagesize:10,
        //    number:$scope.currentJ,
        //    sort:'time'
        //};
        //DataAPI.get($scope.lcsListReqOptions).$promise.then(function(resp) {
        //    $scope.licaishi_list = resp.list;
        //});
        //$scope.left_disabled = false;
});









