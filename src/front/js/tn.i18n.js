Jx().$package('tn.i18n', function(J){

    this.defaultLanguage = 'zh_cn';

    this.language = this.defaultLanguage;

    this.message_zh_cn = {
        'new': '新建',
        'order': '排序'
    };

    this.message_en = {
        'new': 'new',
        'order': 'order'
    };

    this.getMessage = function(key){
        var message = this['message_' + this.language];
        if(message[key]){
            return message[key];
        }else{
            message = this['message_' + this.defaultLanguage];
            return message[key];
        }
    }
});