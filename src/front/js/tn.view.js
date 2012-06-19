Jx().$package('tn.view', function(J){
    var packageContext = this;  
    

    var commands = {
        'new': function(param, target, event){
            
        },
        'order': function(param, target, event){
            
        }
    };

    this.init = function(){
        var contentEl = J.dom.id('content');

        tn.util.render(contentEl, 'contentTmpl', {  });

        tn.util.bindCommands(contentEl, 'click', commands);
    }


});