/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('addMoreList', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            scope.reqOptions.pageindex++;
            scope.$apply(function() {
                DataAPI.get(scope.reqOptions).$promise.then(function(resp){
                  for (var i=0; i < resp.list.length; i++) {
                    scope.targetDatas.list.push(resp.list[i]);
                  }
                });
                console.log(scope.targetDatas);
            });
        });
    }
    return {
        restrict: "A",
        scope: {
            //categoryId: '=',
            reqOptions:'=',
            targetDatas:'='
        },
        link: link
    };
});
