angular.module('fbs.filters')
.filter('msgTypeFilter',function(){
  return function(input){
    var ret;
    if(input == 0) ret="发表了文章";
    if(input == 1) ret="发表了活动";
    if(input == 2) ret="发表了话题";
    if(input == 3) ret="回答了话题";
    return ret;
  }
});