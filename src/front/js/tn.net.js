Jx().$package('tn.net', function(J){
    var packageContext = this;

    var apiRoot = tn.config.API_ROOT;
    var apiMap = tn.config.API_MAP;

    this.require = function(apiName, param, callback){
        var apiObj = apiMap[apiName];
        if(!apiObj){
            throw new Error('no such api!');
        }
        var apiUrl = apiRoot + apiObj.url;
        param = param || {};
        if(apiObj.param){
            param = J.extend(param, apiObj.param);
        }
        var option = {
            data: param,
            arguments: param,
            timeout: 30000,
            onError: function(data){
                data.success = false;
                if(callback){
                    callback(data);
                }else{
                    J.event.notifyObservers(packageContext, apiName + 'Failure', data);
                }
            },
            onTimeout: function(data){
                data.success = false;
                if(callback){
                    callback(data);
                }else{
                    J.event.notifyObservers(packageContext, apiName + 'Failure', data);
                }
            },
            onSuccess: function(data){
                if(callback){
                    callback(data);
                }else if(data.success){
                    J.event.notifyObservers(packageContext, apiName + 'Success', data);
                }else{
                    J.event.notifyObservers(packageContext, apiName + 'Failure', data);
                }
            },
        };
        J.http.ajax(apiUrl, option);
    }//end require
    
    
});//end package