angular.module('fbs.controllers')
.controller('pageListCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $scope.pageList = [
                {name:"首页",url:"index"},
                {name:"—问答",url:"wd"},
                {name:"——问答详情",url:"wd_single"},
                {name:"——创建问答",url:"wd_add"},
                {name:"—活动",url:"activity_list"},
                {name:"—文章",url:"article_list"},
                {name:"——文章详情",url:"article_single"},
                {name:"—理财师",url:"licaishi_list"},
                {name:"——理财师详情",url:"licaishi_single"},
                {name:"发现",url:"fx"},
                {name:"—积分排行",url:"jfph"},
                {name:"—优选理财师",url:"lcs"},
                {name:"—理财师报名",url:"lcs_apply"},
                {name:"—往届理财师",url:"lcs_history"},
                {name:"个人中心",url:"grzx"},
                {name:"—我的积分",url:"wdjf"},
                {name:"—更新资料",url:"gxzl"},
                {name:"消息",url:"xx"},
                {name:"—问卷列表",url:"wjlb"},
                {name:"——问卷",url:"wj"},
                {name:"积分商城",url:"jfsc"},
                {name:"登录",url:"login"},
                {name:"注册",url:"regist"}];
}]);












