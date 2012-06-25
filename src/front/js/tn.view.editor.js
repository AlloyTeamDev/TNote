Jx().$package('tn.view.editor', function(J){
    var packageContext = this;  
    var editorEl,
        editorShowing = false,
        editorEditing = false;

    var commands = {
        'save': function(param, target, event){
            var note = getNoteValue();
            if(note){
                tn.storage.save(note);
            }
            packageContext.hide();
        }
    }

    this.init = function(){
        editorEl = J.dom.id('noteEditor');

        tn.util.bindCommands(editorEl, 'click', commands);

        J.event.addObserver(tn.view, 'resize', observer.onResize);
    }

    this.show = function(note){
        var data = { isEditing: false };
        if(note){//edit or view
            data.note = note;
            editorEditing = false;
        }else{//new
            data.isEditing = true;
            editorEditing = true;
            data.note = {
                createTime: J.format.date(new Date, tn.i18n.getMessage('dateFormat'))
            };
        }
        tn.util.render(editorEl, 'editorTmpl', data);
        J.dom.show(editorEl);
        editorShowing = true;
        if(editorEditing){
            resizeTextarea();
        }
    }

    this.hide = function(){
        J.dom.hide(editorEl);
        editorShowing = false;
    }

    this.isShow = function(){
        return editorShowing;
    }

    var observer = {
        onResize: function(size){
            if(editorShowing && editorEditing){
                resizeTextarea();
            }
        }
    };

    var resizeTextarea = function(){
        var editorContent = editorEl.querySelector('div.note-editor-content');
        var textarea = editorContent.querySelector('textarea');
        var width = J.dom.getClientWidth(editorContent),
            height = J.dom.getClientHeight(editorContent);
        J.dom.setStyle(textarea, 'width', width + 'px');
        J.dom.setStyle(textarea, 'height', height + 'px');
    }

    var getValue = function(selector){
        var el = editorEl.querySelector(selector);
        if(el){
            return el.value;
        }else{
            return null;
        }
    }

    var getNoteValue = function(){
        var title = getValue('.note-editor-title input'),
            content = getValue('.note-editor-content textarea'),
            createTime = getValue('.note-editor-time input');

        if(!createTime){
            tn.view.alert('"createTime" ' + tn.i18n.getMessage('mustfilled'));
            return false;
        }
        if(!content){
            tn.view.alert('"content" ' + tn.i18n.getMessage('mustfilled'));
            return false;
        }

        var note = {
            title: title,
            content: content,
            createTime: createTime
        }
        return note;
    }

});