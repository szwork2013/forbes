/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('sentYzm', function($interval, DataAPI) {
    function link(scope, element, attrs) {
        var format,
            timeoutId,
            deplyNum = 60,
            start = deplyNum;
        function updateTime() {
            element.text(start-- + 's');
        }
        element.bind('click', function() {
            DataAPI.get({
              action:'getsmsvercode',
              phone:scope.phone
            }).$promise.then(function(resp) {
                if(resp.errcode == 0){
                    console.log("发送成功");
                    scope.divDisable = true;
                    element.text(start-- + 's');
                    timeoutId = $interval(function() {
                                  updateTime();
                                },1000,deplyNum).then(function(){
                                  scope.div_disable = false;
                                  element.text('验证码');
                                  start = deplyNum;
                                });
                }else{
                    console.log(resp);
                }
              })
        });
        element.on('$destroy', function() {
            $interval.cancel(timeoutId);
        });
    }
    return {
      restrict: 'A',
      scope:{
        divDisable:'=',
        phone:'='
      },
      link: link
    };
});
