Jx().$package('tn.view', function(J){
    var packageContext = this;  
    

    var commands = {
        'new': function(param, target, event){
            packageContext.editor.show();
        },
        'order': function(param, target, event){
            
        }
    };

    this.init = function(){
        var contentEl = J.dom.id('content');

        tn.util.render(contentEl, 'contentTmpl', {  });

        tn.util.bindCommands(contentEl, 'click', commands);

        this.editor.init();

        J.event.on(window, 'resize', observer.onResize);
    }

    this.alert = function(text, callback){
        //TODO simple alert now
        alert(text);
        callback && callback();
    }

    this.confirm = function(text, callback){
        //TODO simple confirm now
        var result = confirm(text);
        callback(result);
    }

    var observer = {
        onResize: function(){
            var width = window.innerWidth,
                height = window.innerHeight;

            J.event.notifyObservers(packageContext, 'resize', { width: width, height: height });
        }
    }

});