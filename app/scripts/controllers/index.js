angular.module('fbs.controllers')
.controller('indexCtrl',function($scope,$state,DataAPI,$ionicSlideBoxDelegate,$interval,Tools){
        $scope.sliderImgs = DataAPI.get({
            action:'getslide'
        });
         $interval( function() {
            $ionicSlideBoxDelegate.update();
        }, 1000);
        $scope.msgListReqOptions = {
          action:'getindexmsglist',
          pageindex:1,
          pagesize:10,
          sort:'time'
        };
        $scope.loading_show = true;
        DataAPI.get($scope.msgListReqOptions)
          .$promise.then(function(req){
            $scope.msgList = req;
            $scope.loading_show = false;
        });
        $scope.goItem = function(url,operat){
                Tools.pageSkip(url,{operat:operat});
        }
        $scope.news_redirect = function(m_id,m_type){
          console.log(m_id + " " + m_type);
          if(m_type == 0)  {
            Tools.pageSkip("article_single",{newsid : m_id});
          }
          if(m_type == 1)  {
            Tools.pageSkip("activity_single",{activityId : m_id});
          }
          if(m_type == 2)  {
            Tools.pageSkip("wd_single",{wendaId : m_id});
          }
          if(m_type == 3)  {
            Tools.pageSkip("wd_single",{wendaId : m_id});
          }
        }
  });












