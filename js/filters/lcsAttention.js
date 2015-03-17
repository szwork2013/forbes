angular.module('fbs.filters')
.filter('lcsAttention',function(){
  return function(input){
    var ret;
    if(!input) ret="关注";
    if(input) ret="取消关注";
    return ret;
  }
});