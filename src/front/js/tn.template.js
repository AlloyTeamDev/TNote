Jx().$package('tn.template', function(J){

    var templateList = {/*%HtmlTemplates%*/};

    this.get = function(tmplId){
        var tmpl = templateList[tmplId];
        if(!tmpl){
            var tmplNode = document.getElementById(tmplId);
            tmpl = tmplNode.innerHTML;
            tmplNode.parentNode.removeChild(tmplNode);
            templateList[tmplId] = tmpl;
        }
        if(!tmpl){
            throw new Error('no such template. [id="' + tmplId + '"]');
        }
        return tmpl;
    }

});