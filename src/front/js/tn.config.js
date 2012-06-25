Jx().$package('tn.config', function(J){

    this.API_ROOT = 'http://tnote.alloyteam.com/';
    this.API_MAP = {
        'list': {
            url: 'server/list.php',
            param: {
                // start: 0,
                // limit: 10
            }
        },
        'add':{
            url: 'server/add.php'
        },
        'get': {
            url: 'server/get.php'
        },
        'edit': {
            url: 'server/edit.php'
        },
        'delete':{
            url: 'server/delete.php'
        }
    };


});