/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('replyWenda', function(DataAPI,Tools) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            //console.log(attrs.wendaId);
            //scope.reqOptions.content = scope.replyBody;
            //scope.reqOptions.action = scope.replyBody;
            //console.log(scope.reqOptions);
            //
            var replyOptions = {
              action:'replyask',
              content:scope.replyBody,
              id:attrs.wendaId
            };
            scope.$apply(function() {
                DataAPI.get(replyOptions)
                    .$promise.then(function(resp) {
                        if(resp.errcode == 0){
                          scope.replyBody ="";
                          scope.targetData = DataAPI.get(scope.reqOptions);
                          Tools.msgShow(resp.errmsg);
                        }else{
                          console.log('失败');
                          Tools.msgShow(resp.errmsg);
                        }
                });
            });
        });
    }
    return {
        restrict: "A",
        scope: {
            replyBody:'=',
            reqOptions:'=',
            targetData:'='
        },
        link: link
    };
});
