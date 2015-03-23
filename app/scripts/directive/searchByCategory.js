/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('searchByCategory', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            scope.$apply(function() {
                scope.categoryAera = false;
                scope.reqOptions.cateid = scope.categoryId;
                scope.targetDatas = DataAPI.get(scope.reqOptions);
            });
        });
    }
    return {
        restrict: "A",
        scope: {
            categoryId: '=',
            reqOptions:'=',
            targetDatas:'=',
            categoryAera:'='
        },
        link: link
    };
});
