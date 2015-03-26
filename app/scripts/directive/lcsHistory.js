/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('lcsHistory', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            scope.$apply(function() {
                console.log(scope.leftDisabled);
                if(attrs.operat == 'left'){
                  scope.currentJieshu--;
                  scope.leftDisabled = true;
                }else{
                  scope.currentJieshu++;
                }
                //scope.loadingShow = true;
                //DataAPI.get(scope.reqOptions).$promise.then(function(resp){
                //  scope.loadingShow = false;
                //  if(resp.list.length == 0){
                //    scope.isOver = true;
                //    return;
                //  }
                //
                //  for (var i=0; i < resp.list.length; i++) {
                //    scope.targetDatas.list.push(resp.list[i]);
                //  };
                //
                //});
            });
        });
    }
    return {
        restrict: "A",
        scope: {
          currentJieshu:'=',
          leftDisabled:'=',
          operat:'='
        },
        link: link
    };
});
