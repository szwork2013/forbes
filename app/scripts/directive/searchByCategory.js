/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('searchByCategory', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            scope.$apply(function() {
                var current_id = attrs.categoryId;
                scope.reqOptions.cateid = current_id;
                if(current_id == 9999){
                  scope.reqOptions.cateid = null;
                }
                scope.current = current_id;
                scope.targetDatas = DataAPI.get(scope.reqOptions);
            });
        });
    }
    return {
        restrict: "A",
        scope: {
            reqOptions:'=',
            targetDatas:'=',
            current:'='
        },
        link: link
    };
});
