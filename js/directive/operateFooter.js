angular.module('fbs.directives')
.directive('hideFooter', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$watch(attributes.hideFooter, function(value){
        console.log('hidefooter = ' + value);
          $rootScope.hideFooter = value;
        });
        //scope.$on('$destroy', function() {
        //  console.log('attributes.hideTabs ' + attributes.hideTabs);
        //  $rootScope.hideTabs = false;
        //});
      }
    };
});
