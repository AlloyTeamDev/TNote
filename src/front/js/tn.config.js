Jx().$package('tn.config', function(J){

    this.API_ROOT = 'http://tnote.alloyteam.com/';
    this.API_MAP = {
        'listNote': {
            url: 'server/list-note.php',
            param: {
                // start: 0,
                // limit: 10
            }
        },
        'addNote':{
            url: 'server/add-note.php'
        },
        'getNote': {
            url: 'server/get-note.php'
        },
        'editNote': {
            url: 'server/edit-note.php'
        },
        'deleteNote':{
            url: 'server/delete-note.php'
        }
    };

    this.LOCAL_CACHE_NOTE_COUNT =  10;

});