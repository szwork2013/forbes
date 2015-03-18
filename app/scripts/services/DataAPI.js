/**
 * Created by ww on 2015/3/10.
 */
angular.module('fbs.services')
.factory('DataAPI', function($resource, $log) {
    var objClone = function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    var baseReqUrl = "http://forbes.comeoncloud.net/serv/pubapi.ashx";
    var params = {
        appid : 'appid',
        appsecret : 'appsecret',
        callback : 'JSON_CALLBACK'};
    var resource =  $resource(baseReqUrl, null, {
        get:{
            method: 'JSONP'
        }
    });
    return {
        get:function(subparams){
            var temp = objClone(params);
            for(var i in subparams){
                temp[i] = subparams[i];
            }
            return resource.get(temp);
        }
    };

});
