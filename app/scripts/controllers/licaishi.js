angular.module('fbs.controllers')
.controller('licaishiListCtrl',function($scope,$state,DataAPI,$stateParams) {
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
            $state.go('licaishi_single',{licaishiId:licaishiId});
        };
        $scope.atteLcs = function (licaishi, $event) {
            if ($event.stopPropagation) $event.stopPropagation();
            var atteStatus = licaishi.isattention;
            if(atteStatus){
                console.log("取消关注理财师");
                DataAPI.get({
                    action:'cancelattention',
                    touserid:licaishi.userid
                }).$promise.then(function(resp) {
                    if(resp.errcode == 0){
                        console.log("取消关注成功");
                        licaishi.isattention = !licaishi.isattention;
                    }else if(resp.errcode == 1){
                        console.log("取消关注失败");
                    }else if(resp.errcode == -1){
                        console.log("尚未登录");
                    }else if(resp.errcode == 2){
                        console.log("已经关注过了");
                    }
                });
            }else{
                console.log("关注理财师");
                DataAPI.get({
                    action:'addattention',
                    touserid:licaishi.userid
                }).$promise.then(function(resp) {
                        if(resp.errcode == 0){
                            console.log("关注成功");
                            licaishi.isattention = !licaishi.isattention;
                        }else if(resp.errcode == 1){
                            console.log("关注失败");
                        }else{
                            console.log("尚未登录");
                        }
                });
            }
            console.log(licaishi);
            //if(){
            //
            //}
            //
            //$state.go('licaishi_single',{licaishiId:licaishiId});
        };
})
.controller('licaishiSingleCtrl',function($scope,$state,$stateParams,DataAPI) {
    var licaishiId = $stateParams.licaishiId;
    $scope.licaishi = DataAPI.get({
        action : 'getmasterdetail',
        userid : licaishiId
    });
    $scope.zixun = function (touserid) {
        $state.go('wd_add',{touserid:licaishiId});
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









