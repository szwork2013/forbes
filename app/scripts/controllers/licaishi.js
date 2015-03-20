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

        $scope.lcsListReqOptions = {
            action:actionsUrl,
            pageindex:1,
            pagesize:10,
            keyword:''
        };
        $scope.categoryAera = false;
        $scope.ctgListReqOptions = {
            action:'getmastertaglist',
            pageindex:1,
            pagesize:10
        };
        $scope.pageDatas = {
            licaishiList:DataAPI.get($scope.lcsListReqOptions),
            categoryList:DataAPI.get($scope.ctgListReqOptions)
        };
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
});









