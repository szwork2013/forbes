var app = angular.module('fbs', [
    'ionic',
    'ngSanitize',
    'ngResource',
    'ngCookies',
    'fbs.controllers',
    'fbs.filters',
    'fbs.directives',
    'fbs.services',
    'shoppinpal.mobile-menu'
]);
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$resourceProvider,$compileProvider){
    $resourceProvider.defaults.stripTrailingSlashes = false;
    $ionicConfigProvider.views.maxCache(0);
    //$compileProvider.debugInfoEnabled(false);
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('login',{
        url: '/login',
        views: {
            'mainContent': {
                templateUrl: 'pages/login.html',
                controller:'signCtrl'
            }
        }
    }).state('regist',{
        url: '/regist',
        views: {
            'mainContent': {
                templateUrl: 'pages/regist.html',
                controller:'signCtrl'
            }
        }
    }).state('index',{
        url: '/index',
        //templateUrl: 'pages/index/index.html',
        //controller:'indexCtrl'
        views: {
            'mainContent': {
                templateUrl: 'pages/index/index.html',
                controller:'indexCtrl'
            }
        }
    }).state('wd_list',{
        url: '/wd_list/:operat',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/wd/wd_list.html',
                controller:'wendaListCtrl'
            }
        }

    }).state('wd_single',{
        url: '/wd_single/:wendaId',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/wd/wd_single.html',
                controller:'wendaSingleCtrl'
            }
        }
    }).state('wd_add',{
        url: '/wd_add/:touserid',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/wd/wd_add.html',
                controller:'wendaAddCtrl'
            }
        }
    }).state('activity_list', {
        url: '/activity_list/:operat',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/activity/activity_list.html',
                controller:'activityListCtrl'
            }
        }
    }).state('activity_single',{
        url: '/activity_single/:activityId',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/activity/activity_single.html',
                controller:'activitySingleCtrl'
            }
        }
    }).state('article_list', {
        url: '/article_list',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/article/article_list.html',
                controller:'articleListCtrl'
            }
        }
    }).state('article_single', {
        url: '/article_single/:newsid',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/article/article_single.html',
                controller:'articleSingleCtrl'
            }
        }
    }).state('licaishi_list', {
        url: '/licaishi_list/:operat',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/licaishi/licaishi_list.html',
                controller:'licaishiListCtrl'
            }
        }
    }).state('licaishi_single', {
        url: '/licaishi_single/:licaishiId',
        views: {
            'mainContent': {
                templateUrl: 'pages/index/licaishi/licaishi_single.html',
                controller:'licaishiSingleCtrl'
            }
        }
    }).state('fx',{
        url: '/fx',
        views: {
            'mainContent': {
                templateUrl: 'pages/fx/fx.html'
            }
        }
    }).state('jfph',{
        url: '/jfph',
        views: {
            'mainContent': {
                templateUrl: 'pages/fx/jfph.html',
                controller:'faxianCtrl'
            }
        }
    }).state('lcs',{
        url: '/lcs',
        views: {
            'mainContent': {
                templateUrl: 'pages/fx/lcs.html',
                controller:'faxianCtrl'
            }
        }
    }).state('lcs_apply',{
        url: '/lcs_apply',
        views: {
            'mainContent': {
                templateUrl: 'pages/fx/lcs_unapply.html',
                controller:'licaishiOtherCtrl'
            }
        }
    }).state('lcs_history',{
        url: '/lcs_history',
        views: {
            'mainContent': {
                templateUrl: 'pages/fx/lcs_history.html',
                controller:'licaishiHistoryCtrl'
            }
        }
    }).state('grzx',{
        url: '/grzx',
        views: {
            'mainContent': {
                templateUrl: 'pages/grzx/grzx.html',
                controller:'personCtrl'
            }
        }
    }).state('wdjf',{
        url: '/wdjf',
        views: {
            'mainContent': {
                templateUrl: 'pages/grzx/wdjf.html',
                controller:'personCtrl'
            }
        }
    }).state('gxzl',{
        url: '/gxzl',
        views: {
            'mainContent': {
                templateUrl: 'pages/grzx/gxzl.html',
                controller:'personCtrl'
            }
        }
    }).state('xx',{
      url: '/xx',
      views: {
        'mainContent': {
          templateUrl: 'pages/xx/xx.html',
          controller:'xiaoxiCtrl'
        }
      }
    }).state('xx_list',{
      url: '/xx_list/:operat',
      views: {
        'mainContent': {
          templateUrl: 'pages/xx/xx_list.html'
        }
      }
    }).state('wjlb',{
        url: '/wjlb/:operat',
        views: {
            'mainContent': {
                templateUrl: 'pages/xx/wj_list.html',
                controller:'xiaoxiCtrl'
            }
        }
    }).state('wj',{
        url: '/wj',
        templateUrl: 'pages/xx/wj.html'
    }).state('jfsc',{
        url: '/jfsc',
        views: {
            'mainContent': {
                templateUrl: 'pages/jfsc.html'
            }
        }
    }).state('pageList',{
        url: '/pageList',
        views: {
            'mainContent': {
                templateUrl: "pages/pageList.html",
                controller:'pageListCtrl'
            }
        }
    });
});
app.controller('appCtrl',function($scope,Tools,$rootScope,$interval){
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.tab = 1;
    $scope.selectTab = function(setTab){
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
    };
    $scope.rollback = function () {
        Tools.pageReturn();
    };
    $rootScope.hidefooter = false;
    $rootScope.msg_show = false;
    $rootScope.msg_cont = "操作成功";
});
angular.module('fbs.controllers', []);
angular.module('fbs.services', []);
angular.module('fbs.filters', []);
angular.module('fbs.directives', []);






















