/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('searchByKeyword', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            scope.$apply(function() {
                scope.reqOptions.keyword = scope.keyword;
                scope.targetDatas.licaishiList = DataAPI.get(scope.reqOptions);
            });
        });
    }
    return {
        restrict: "A",
        scope: {
            keyword: '=',
            reqOptions:'=',
            targetDatas:'='
        },
        link: link
    };
});
