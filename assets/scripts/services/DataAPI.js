angular.module("fbs.services").factory("DataAPI",function($resource){var objClone=function(obj){if(null==obj||"object"!=typeof obj)return obj;var copy=obj.constructor();for(var attr in obj)obj.hasOwnProperty(attr)&&(copy[attr]=obj[attr]);return copy},baseReqUrl="http://forbes.comeoncloud.net/serv/pubapi.ashx",params={appid:"appid",appsecret:"appsecret",callback:"JSON_CALLBACK"},resource=$resource(baseReqUrl,null,{get:{method:"JSONP"}});return{get:function(subparams){var temp=objClone(params);for(var i in subparams)temp[i]=subparams[i];return resource.get(temp)}}});