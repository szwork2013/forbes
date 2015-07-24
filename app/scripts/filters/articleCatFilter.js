angular.module('fbs.filters')
.filter('articleCatFilter',function(){
  return function(input){
    var tempCategories = [];
    angular.forEach(input,function(category){
      if(category.categoryid != 498 && category.categoryid != 499){
        tempCategories.push(category);
      }
    });
    return tempCategories;
  }
});
