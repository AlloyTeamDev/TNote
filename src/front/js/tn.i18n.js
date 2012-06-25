Jx().$package('tn.i18n', function(J){

    this.defaultLanguage = 'zh-CN';

    this.language = this.defaultLanguage;

    var MESSAGE_LIST = {
        'zh-CN': {
            'new': '新建',
            'order': '排序',
            'edit': '编辑',
            'save': '保存',
            'dateFormat': 'YYYY/MM/DD',
            'unnamed': '未命名',
            'mustfilled': '必填'
        },
        'en': {
            'new': 'new',
            'order': 'order'
        }
    };

    this.getMessage = function(key){
        var message = MESSAGE_LIST[this.language];
        if(message[key]){
            return message[key];
        }else{
            message = MESSAGE_LIST[this.defaultLanguage];
            return message[key];
        }
    }
});