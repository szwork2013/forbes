angular.module('fbs.filters')
.filter('articleFilter',function(){
  return function(input){
    var tempArticles = [];
    angular.forEach(input,function(article){
      if(article.categoryid != 498 && article.categoryid != 499){
        tempCategories.push(article);
      }
    });
    return tempArticles;
  }
});
