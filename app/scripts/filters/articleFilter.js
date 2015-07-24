angular.module('fbs.filters')
.filter('articleFilter',function(){
  return function(input){
    var tempArticles = [];
    angular.forEach(input,function(article){
      if(article.cateid != 498 && article.cateid != 499){
        tempArticles.push(article);
      }
    });
    return tempArticles;
  }
});
