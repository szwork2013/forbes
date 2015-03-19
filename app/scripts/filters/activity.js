angular.module('fbs.filters')
.filter('activityStatusTextFilter',function(){
  return function(input){
    var ret;
    if(input == 0) ret="进行中";
    if(input == 1) ret="已结束";
    if(input == 2) ret="满员";
    return ret;
  }
});