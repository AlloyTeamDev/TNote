Jx().$package('tn.util', function(J){

    /**
     * 获取点击的事件源, 该事件源是有 cmd 属性的 默认从 event.target 往上找三层,找不到就返回null
     * 
     * @param {Event}
     *            event
     * @param {Int}
     *            level 指定寻找的层次
     * @param {String}
     *            property 查找具有特定属性的target,默认为cmd
     * @param {HTMLElement} parent 指定查找结束点, 默认为document.body
     * @return {HTMLElement} | null
     */
    this.getActionTarget = function(event, level, property, parent){
        var t = event.target,
            l = level || 3,
            s = level !== -1,
            p = property || 'cmd',
            end = parent || document.body;
        while(t && (t !== end) && (s ? (l-- > 0) : true)){
            if(t.getAttribute(p)){
                return t;
            }else{
                t = t.parentNode;
            }
        }
        return null;
    }
    /**
     * @example
     * bindCommends(cmds);
     * bindCommends(el, cmds);
     * bindCommends(el, 'click', cmds);
     * 
     * function(param, target, event){
     * }
     */
    this.bindCommends = function(targetElement, eventName, commends){
        var defaultEvent = 'click';
        if(arguments.length === 1){
            commends = targetElement;
            targetElement = document.body;
            eventName = defaultEvent;
        }else if(arguments.length === 2){
            commends = eventName;
            eventName = defaultEvent;
        }
        if(targetElement._commends){//已经有commends 就合并
            J.extend(targetElement._commends, commends);
            return;
        }
        targetElement._commends = commends;
        if(!targetElement.getAttribute('cmd')){
            targetElement.setAttribute('cmd', 'void');
        }
        J.event.on(targetElement, eventName, function(e){
            var target = mb.util.getActionTarget(e, -1, 'cmd', this);
            if(target){
                var cmd = target.getAttribute('cmd');
                var param = target.getAttribute('param');
                if(target.href && target.getAttribute('href').indexOf('#') === 0){
                    e.preventDefault();
                }
                if(this._commends[cmd]){
                    this._commends[cmd](param, target, e);
                }
            }
        });
    }
    
    /**
     *  @param {HTMLElement},{String} targetId, target dom or dom id
     *  @param {String} tmplId template dom id
     *  @param {Object} data
     *  @param {Number} position @optional the index to insert, -1 to plus to last
     */
    this.render = function(target, tmplId, data, position){
        data = data || {};
        var tabTmpl = tn.template.get(tmplId);
        var html = J.string.template(tabTmpl, data);
        html = J.string.trim(html);
        if(!html){
            return;
        }
        if(typeof target === 'string'){
            target = J.dom.id(target);
        }
        if(position === 'front'){
            position = 0;
        }else if(position === 'tail'){
            position = -1;
        }
        if(!J.isUndefined(position) && target.childElementCount){
            var tempNode = document.createElement('div');
            tempNode.innerHTML = html;
            var nodes = tempNode.childNodes; //include text node
            var fragment = document.createDocumentFragment();
            while(nodes[0]){
                fragment.appendChild(nodes[0]);
            }
            if(position === -1 || position >= target.childElementCount){
                target.appendChild(fragment);
            }else{
                target.insertBefore(fragment, target.children[position]);
            }
            delete tempNode;
        }else{
            target.innerHTML = html;
        }
        target.scrollTop = target.scrollTop + 1;
        target.scrollTop = target.scrollTop - 1;
    }

});