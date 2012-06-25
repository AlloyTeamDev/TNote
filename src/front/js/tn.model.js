Jx().$package('tn.model', function(J){
    var packageContext = this;

    var tuid = 1;

    var Note = {
        id: 0,
        tuid: 0,
        title: '',
        content: '',
        createTime: 0,
        lastModifyTime: 0,
        status: 0
    };

    this.getAccount = function(){
        var account = {//TODO hack
            id: 1
        };
        return account;
    }


    this.getNoteTempUid = function(){
        return tuid++;
    }

    this.saveNote = function(note){
        J.event.notifyObservers(packageContext, 'beforeSaveNote', note);
        note.tuid = packageContext.getNoteTempUid();
        var account = this.getAccount();
        tn.storage.addNote(account.id, note);
        tn.net.require('addNote', {
            uid: account.id,
            note: note
        });
        J.event.notifyObservers(packageContext, 'noteSaved', note);
    }


});