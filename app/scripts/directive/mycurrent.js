/**
 * Created by ww on 2015/3/14.
 */
angular.module('fbs.directives')
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
    function link(scope, element, attrs) {
        var format,
            timeoutId,
            start = 60;
        function updateTime() {
            element.text(start-- + 's');
        }
        scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
        });
        element.on('$destroy', function() {
            $interval.cancel(timeoutId);
        });
        console.log('it is start!');

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(function() {
            updateTime(); // update DOM
            console.log('excu...');
        },1000,60).then(function(){
            console.log('it is finished!');
        });

        console.log(timeoutId);
    }

    return {
        link: link
    };
}]);
