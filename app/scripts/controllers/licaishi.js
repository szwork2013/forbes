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
.controller('licaishiOtherCtrl',function($scope,$http,DataAPI,Tools) {
    DataAPI.get({
        action:'getcurrentuserinfo'
    }).$promise.then(function(resq){
        if(resq.errcode = -2 && !resq.totalscore){
          Tools.pageSkip('login');
        }else{
          $scope.personinf = resq;
          $scope.maindata.Name=resq.truename;
        }
    });


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


        $scope.checkboxdata1={
            cfp:{
                checked:false,
                name:"国际金融理财师（CFP）"
            },
            afp:{
                checked:false,
                name:"金融理财师（AFP）"
            },
            rfp:{
                checked:false,
                name:"注册财务策划师（RFP）"
            },
            cwm:{
                checked:false,
                name:"特许财富管理师（CWM）"
            },
            cpb:{
                checked:false,
                name:"私人银行家（CPB）"
            },
            rfc:{
                checked:false,
                name:"国际认证财务顾问师（RFC）"
            }
        }


        $scope.checkboxdata2={
            jt:{
                checked:false,
                name:"家庭（个人）财务分析"
            },
            zc:{
                checked:false,
                name:"资产管理或投资规划"
            },
            fx:{
                checked:false,
                name:"风险管理或保险规划"
            },
            zv:{
                checked:false,
                name:"子女教育金规划"
            },
            hf:{
                checked:false,
                name:"换房规划"
            },
            sw:{
                checked:false,
                name:"税务筹划"
            }
        }


        $scope.maindata={
            K9:0,
            Name:"",
            Phone:"",
            K1:1,
            K2:"",
            K3:"",
            K6:"",
            K8:"",
            K11:"本科",
            K4:"",
            K5:"",
            K7:"",
            K13:"",
            K15:""
        }


  $scope.submitdata=function(){

        for(aa in $scope.checkboxdata1){
            if($scope.checkboxdata1[aa].checked == true){
                $scope.maindata.K13 +=$scope.checkboxdata1[aa].name+",";
            }
        }
        $scope.maindata.K13=$scope.maindata.K13.substring(0, $scope.maindata.K13.length-1)
        
        for(bb in $scope.checkboxdata2){
            if($scope.checkboxdata2[bb].checked == true){
                $scope.maindata.K15 +=$scope.checkboxdata2[bb].name+",";
            }
        }
        $scope.maindata.K15=$scope.maindata.K15.substring(0, $scope.maindata.K15.length-1)

        var mainurl="http://forbes.comeoncloud.net/serv/pubapi.ashx";
        mainurl+="?action=submitactivitysigndata";
        mainurl+="&activityid=291504";

        for(cc in  $scope.maindata){
            mainurl+= "&"+cc+"="+$scope.maindata[cc];
        }
        mainurl+="&callback=JSON_CALLBACK";
    
        $http.jsonp(mainurl)
        .success(function(data){
            if(!data.errcode){
                alert(data.errmsg)
            }else{

            }
            console.log("success");
            console.log(data);
        })
        .error(function(error){
            console.log(error);

        })
  }

})
.controller('licaishiHistoryCtrl',function($scope,DataAPI) {
        DataAPI.get({
          action:'getmasternumberlist'
        }).$promise.then(function(resp) {
            $scope.jieshu = resp;
            $scope.currentJ = resp.totalcount - 2;
        });
        $scope.lcsListReqOptions = {
            action:'getmasterlist',
            pageindex:1,
            pagesize:10,
            number:$scope.currentJ,
            sort:'time'
        };
        DataAPI.get($scope.lcsListReqOptions).$promise.then(function(resp) {
            $scope.licaishi_list = resp.list;
        });
        $scope.left_disabled = false;
});









