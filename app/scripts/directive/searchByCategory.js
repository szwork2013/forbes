/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('searchByCategory', function(DataAPI) {
    function link(scope, element, attrs) {
        element.bind('click', function() {
            //console.log(scope.datasOfName);
            //console.log(scope.reqOptions);
            //console.log(scope.targetDatas);
            scope.$apply(function() {
                var dealDataName = 'licaishiList';
                scope.categoryAera = false;
                //for(var key in scope.targetDatas){
                //    if(key.indexOf('List')){
                //        console.log(key);
                //    }
                //}
                scope.reqOptions.cateid = scope.categoryId;
                scope.targetDatas[dealDataName] = DataAPI.get(scope.reqOptions);
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
