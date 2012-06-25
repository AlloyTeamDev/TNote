Jx().$package('tn.storage', function(J){
    
    var packageContext = this;

    var TN = 'tn';
    /*
user{
    uid: {
        list: [
            note1,
            note2
            //...
        ],
        unsync: [
            note1
        ]
    }
}
    */

    var setLocalStorage = function(data){
        data = JSON.stringify(data);
        localStorage.setItem(TN, data);
    }

    var getLocalStorage = function(){
        var data = localStorage.getItem(TN);
        return data ? JSON.parse(data) : {};
    }

    this.addNote = function(uid, note){
        var data = getLocalStorage(),
            userData = data[uid],
            maxNote = tn.config.LOCAL_CACHE_NOTE_COUNT;
        if(!userData){//init local cache
            userData = data[uid] = {
                list: []
            };
        }
        userData.list.unshift(note);
        if(userData.list.length > maxNote){
            userData.list.splice(maxNote);
        }
        setLocalStorage(data);
    }

    this.getNoteList = function(){
        var data = getLocalStorage(),
            userData = data[uid];
        return userData ? userData.list : null;
    }





});