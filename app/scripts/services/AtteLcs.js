/**
 * Created by ww on 2015/3/10.
 */
angular.module('fbs.services')
.factory('AtteLcs', function(DataAPI,Tools) {
        var atte = function(licaishi){
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
                    //console.log("尚未登录");
                    Tools.msgShow("尚未登录");
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
                    Tools.msgShow("尚未登录");
                  }
                });
            }
        };
        return {
            atte:atte
        };
});
