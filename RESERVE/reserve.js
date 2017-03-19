
Object.prototype.lastElement = function(){
    var i = this.length>0? this.length-1 : 0;
    return this[i]
}
Object.prototype.add = function(op,name,parent){
    var self = this
    var result
    var _p = /parent/i
    var _s = /sibling/i
    var _c = /child/i
    var _propID = {}
    _propID.__p = _p
    _propID.__s = _s
    _propID.__c = _c
    _propID[_p] = _propID["parent"] =  function(w,x,r)
    {
        var ret
        var re = new RegExp(this.__p)
        if(r.match(re)){
            ret = self.parent.nodes.addNode(w,x.parent.parent || "unassigned")
        }
        return ret
    }
    _propID[_s] = _propID["sibling"] = function(w,x,r)
    {
        var ret
        var re = new RegExp(this.__s)
        if(r.match(re)){
            ret = self.nodes.addNode(w,x.parent)
        }
        return ret
    }
    _propID[_c] = _propID["child"] = function(w,x,r)
    {
        var ret
        var re = new RegExp(this.__c)
        if(r.match(re)){
            ret = self.nodes.addNode(w,x) // self.nodes.lastElement().nodes.addNode(w,x)
        }
        return ret
    }
   result = 
    _propID[op](name,parent,op) || 
    _propID[_p](name,parent,op) || 
    _propID[_s](name,parent,op) || 
    _propID[_c](name,parent,op);
    return result
}
var g_currentNode
Object.prototype.updateTrace = function(w,indent){
    var result
    var op
    /*
    var i = this.findIndexOf(w)
    var indexNotFound = (i<0);
    var tailNodeReached = (indent == 0);
    if(indexNotFound){
        i = this.length - 1
    }
    var indexOutOfRange = (indexNotFound  && (i<0));
    */
    this.indent>-1 || (this.indent = 0);
    g_currentNode || (g_currentNode = this);
    if(indent>g_currentNode.indent)
    {
        op = "child"
    }
    else
    if(indent<g_currentNode.indent)
    {
        op = "parent"
    }
    else
    if(indent==g_currentNode.indent)
    {
        op = "sibling"
    }
    if(op)
    {
        result = g_currentNode = g_currentNode.add(op,w,g_currentNode)
        g_currentNode.indent = indent
    }
    return result
    /*
    if(!indexNotFound){
        result = this[i]
        i = this.length-1
        if(!tailNodeReached)
        {
            this[i].nodes.push(result)
        }
        else
        {
            this.push(result)
        }
    }
    else
    if((tailNodeReached && indexNotFound ) || indexOutOfRange){
        result = this.addNode(w,parent)
    }
    else{
        parent = this[i].name
        result = this[i].nodes.updateTrace(w,--indent,parent)
    }
    return result
    */
}
Object.prototype.traceV2 = function(code,tab,reps,ref,cb){
    ref || (ref = "");
    var pad = tab.dup(reps);
    if(this.length){
        this.map(
        function(u){
            var ref_tmp
            cb && (ref_tmp = cb(u.name,ref))
            code.push(pad + ref_tmp + u.name)
            u.code.length && code.push(pad + ref_tmp + u.code.replace(/\n/g,"\n"+tab))
            /*
            u.nodes && u.nodes.length && u.nodes.map(
            function(v){
                code.push(pad + ref_tmp + v.name)
                return v
            })
            */
            return u
        })
    }
    else{
        code.push("")
    }
}
/*
Object.prototype.REGEX[g_reConstructor] = function(w)
{
  try{
    var idx = this.length-1;
    var u = w.match(g_reConstructorCapture)[1]
    var np = u.noParams()
    var v = this[idx].name;
    var isModuleConstructor = (np == v);
    if(isModuleConstructor){
      this[idx]._constructor.push(u);
    }
  }
  catch(e){
    var u = ""
  }
  return u
}
*/
    /*
    intf["callstack"].nodes.map(
    function(u){
        cstart.push("", "function __" + u.name + "{", tab + "var self = this")
        u.code.length && cstart.push(tab + u.code.replace(/\n/g,"\n"+tab))
        u.nodes && u.nodes.trace(cstart,tab,0)
        u.nodes && u.nodes.map(
        function(v){
            cstart.push(tab + "self." + v.name)
            return v
        })
        cstart.push("}", "var " + u.name.noParams() + " = new __" + u.name)
        return u 
    })
    */
function ModuleProps(){
    this.__properties = [ 
        "globalAttributes",
        "globalProperties",
        "_constructor",
        "memberAttributes",
        "memberProperties",
        "_properties",
        "_attributes"
    ]    
    this.globalAttributes = []
    this.globalProperties = []
    this._constructor = []
    this._properties = []
    this._attributes = []
    this.memberAttributes = []
    this.memberProperties = []
}
            if(renameObjectLR){
                v = renameObjectLR[0]
                u = renameObjectLR[1]
                screenBuffer[i] = u
                //srcStackTrace.setLines(srcStackTrace.getLines().replace(/^(\s*).*>>\s*(.*)$/,"$1$2"));
            }
            else
            if(renameObjectRL){
                u = renameObjectRL[0]
                v = renameObjectRL[1]
                screenBuffer[i] = u
                //srcStackTrace.setLines(srcStackTrace.getLines().replace(/^(.*)\s+<<.*$/,"$1"));
            }
    var cstart = [];
    intf["callstack"] = callstack
    intf["callstack"].nodes.map( //['/** JBLAST - AUTO GENERATED CODE **/\n\n']
    function(u){
        cstart.push("", "function __" + u.name + "{", tab + "var self = this")
        u.code.length && cstart.push(tab + u.code)
        u.nodes && u.nodes.trace(cstart,tab,0)
        u.nodes && u.nodes.map(
        function(v){
            cstart.push(tab + "self." + v.name)
            return v
        })
        cstart.push("}", "var " + u.name.noParams() + " = new __" + u.name)
        return u 
    })
    //cstart.push('\n/************* JBLAST *************/')
    srcTranslated.setLine(cstart.join('\n'))
    var entity = []
    var archive = {}
    entity.map(function(w) {
        var s = buildproc(w)
        if (s) {
            cstart.push(s + '\n')
        }
        return w
    })
function buildproc(source) {
    var s = ''
    if (source instanceof Array) {
        source.map(function(u) {
            if (typeof (u) == 'string') {
                s += u
            } else if (u instanceof Array) {
                s += buildproc(u)
            }
            return u
        })
    } else 
    if (typeof (source) == 'string') {
        s = source
    }
    return s
}
function set_gparent_codebody(arch, en, s_name, code, indent) {
    var name = 1
    var codebody = 5
    var last_entry
    var p_s_name = arch[s_name].parent.s_name
    var addcode = true
    en[codebody].map(function(s, i) {
        if (s[name] == p_s_name) {
            last_entry = i
            s[codebody].map(function(u) {
                if (u[name] == s_name) {
                    addcode = false
                }
                return u
            })
        }
        return s
    })
    if (addcode && (typeof (last_entry) == 'number')) {
        en[codebody][last_entry][codebody].push(code)
    }
    return en
}
function updatecallstack(arch, stack, indent) {
    if (indent == 0) {
        stack = [arch]
    } else 
    if (stack.length == indent) {
        stack.push(arch)
    } else 
    if (stack.length < indent) {
        stack.push(arch)
    } else 
    if (stack.length > indent) {
        while (stack.length != indent) {
            stack.pop()
        }
        stack.push(arch)
    }
    return stack
}
        /*
        while (!entity[indent]) {
            entity.push([])
        }
        if (indent < 1) {
            if (!archive[w]) {
                archive[w] = {}
                archive[w].indent = 0
                archive[w].s_name = w
                archive[w].name = 1
                archive[w].params = 3
                archive[w].codebody = 5
                entity[0].push(['\nfunction _', w, '(', [], '){\n', [minor_tab + intf.module[intf.archive[archive[w].s_name]].replace(/\n/gm,'\n' + minor_tab) + '\n'], '\n}\n_', w, '.prototype = new Object()\n', w, ' = new _', w, '()'])
                archive[w].level = entity[0].length - 1
            }
            callstack = updatecallstack(archive[w], callstack, indent)
        } else if (indent < 2) {
            if (!archive[w]) {
                archive[w] = {}
                archive[w].indent = indent
                archive[w].s_name = w
                archive[w].name = 1
                archive[w].params = 3
                archive[w].codebody = 5
                archive[w].level = entity[0].length - 1
                callstack = updatecallstack(archive[w], callstack, indent)
                archive[w].parent = {s_name: callstack[indent - 1].s_name,indent: callstack[indent - 1].indent,level: callstack[indent - 1].level}
                archive[w].godparent = {s_name: callstack[0].s_name,indent: callstack[0].indent,level: callstack[0].level}
                var gpindent = archive[w].godparent.indent
                var gplevel = archive[w].godparent.level
                var codebody = archive[w].codebody
                entity[gpindent][gplevel][codebody].push([minor_tab + 'this["', w, '"] = function(', [], '){\n', [major_tab + intf.module[intf.archive[archive[w].s_name]].replace(/\n/gm,'\n' + major_tab) + '\n'], '\n' + minor_tab + '}\n'])
            }
            indent = archive[w].indent
            var parent = archive[w].parent.s_name
            entity[indent].push([parent + '.', w, '(', [], ')', '\n'])
        } else {
            if (!archive[w]) {
                archive[w] = {}
                archive[w].s_name = w
                archive[w].name = 1
                archive[w].params = 3
                archive[w].codebody = 5
                archive[w].indent = indent
                archive[w].level = entity[0].length - 1
                callstack = updatecallstack(archive[w], callstack, indent)
                archive[w].parent = {s_name: callstack[indent - 1].s_name,indent: callstack[indent - 1].indent,level: callstack[indent - 1].level}
                archive[w].godparent = {s_name: callstack[0].s_name,indent: callstack[0].indent,level: callstack[0].level}
                var gpindent = archive[w].godparent.indent
                var gplevel = archive[w].godparent.level
                var codebody = archive[w].codebody
                entity[gpindent][gplevel][codebody].unshift([minor_tab + 'this["', w, '"] = function(', [], '){\n', [major_tab + intf.module[intf.archive[archive[w].s_name]].replace(/\n/gm,'\n' + major_tab) + '\n'], '\n' + minor_tab + '}\n'])
            }
            var gpindent = archive[w].godparent.indent
            var gplevel = archive[w].godparent.level
            entity[gpindent][gplevel] = set_gparent_codebody(archive, entity[gpindent][gplevel], w, [major_tab + 'this.', w, '(', [], ')', '\n'], indent)
        }
        // test(indent) //
        */
var idx = n.match(/\s/g) || {length: 0}
        var indent = idx.length
        // var w = n.replace(/\s+/g, '') //
        // callstack.nodes.updateTrace(w,indent) //
        if(indent==0){
            iStart = I
            callstack.push(n)
        }
        else{
            var pad = ""
            var J = Math.min(indent,iStart+1)
            for(var j=iStart;j<J;j++){
                if(pad){
                    pad += "."
                }
                pad += buffer2[j]
            }
            if(pad){
                pad += "."
            }
            callstack.push(pad+n)
            if(indent<lastIndent){
                iStart = I
            }
        }
        lastIndent = indent
Object.prototype.updateTrace = function(w,indent,parent){
    if(indent--){
        if(
        (this.length != null) &&
        (this.length > 0)
        ){
            var i = this.length-1 
            if(
            (i == 0) ||
            (parent && (parent != this[i].name))
            ){
                parent = this[i].name
                this[i].nodes.updateTrace(w,indent,parent)
            }
            else
            if(i){
                this[i].nodes.updateTrace(w,0)
            }
        }
        else{
            this.addNode(w)
        }        
    }
    else{
        var i = this.indexOf(w)
        this[i] || (this.addNode(w))
    }
}

var intf = {
    'default': function() {
        srcTranslated.value = 'Functionality not implemented.'
    }, // intf 'default'
    0: function() { // Procedural-Designer //
        return srcStackTrace.value.split(/\n+/)
    },
    1: function() { // parameter-list //
    },
    2: function() { // code body //
    },
    3: function() { // compare //
    },
    4: function() { // assert //
    },
    5: function() { // iterate //
    },
    "__main": function() { // msg handler //
        if (!intf.archive) {
            intf.archive = {}
        }
        if (!intf.module) {
            intf.module = []
        }
        if (intf.module[selBoxModules.selectedIndex]) {
            refresh_module(selBoxModules.selectedIndex)
            //srcSnapShot.value = intf.module[selBoxModules.selectedIndex]
        } else {
            //refresh_module(selBoxModules.selectedIndex)
            var s = []
            //intf.module = []
            intf.archive = {}
            var added = {}
            var code_lhs = "<option>"
            var code_rhs = "</option>"
            var buffer = arguments[0].replace(/\s+/gm, '\n').split(/\n+/gm)
            buffer.map(function(u) {
                if (!added[u]) {
                    added[u] = 1
                    s.push(code_lhs + u + code_rhs)
                    intf.archive[u] = s.length-1
                    /*
                    if (
                    !intf.archive[u] || 
                    ((u in intf.archive) && (intf.archive[u] != srcSnapShot.value))
                    ) { // intf scope allows for blank entries //
                        intf.module.push(srcSnapShot.value)
                        intf.archive[u] = srcSnapShot.value
                    }
                    */
                }
                return u
            })
            selBoxModules.style.display = "none"
            selBoxModules.innerHTML = s.join('')
            selBoxModules.style.display = "block"
            divLibrary.value = intf.module.join('%%')
            refresh_module(selBoxModules.selectedIndex)
            /*
            selected.value = selBoxModules.selectedIndex
            refresh_module(selBoxModules.selectedIndex)
            */
        }
    },
    "archive": {},
    "module": [],
} // intf {}
//
(indent<1) {
    (!_ <= archive => [w]){
        ( _ <= archive => [w] ) => { indent <= 0,s_name <= w,name <= 1 }
        ( __ <= entity ) => [0] => push(['\nfunction _',w,'(',[],'){\n',[],'\n}\n_',w,'.prototype = new Object()\n',w,' = new _',w
    }
    callstack <= updatecallstack(_,callstack,indent)
}
//
(indent<2) {
    (!_){
        _ => name <= 1
        callstack <= updatecallstack(_,callstack,indent)
        _ => level <= __ => [0] => length-1
        _ => parent => { s_name <= callstack => [indent-1] => s_name,indent <= callstack => [indent-1] => indent,level <= callstack => [indent-1] => level }
        __ => [gpi <= _ => godparent => indent <= callstack => [0] => indent] => [gpl <= _ => godparent => level <= callstack => [0] => level] => [gpc <= _ => godparent => codebody <= 5] => push([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [indent] => push([_ => parent => s_name <= callstack => [0] => s_name + '.',w,'(',[],')','\n'])
} 
//
function buildscope(JINT,me,i,localstack,ops){
    /*
    var data = 0
    var index = 1
    var row = localstack.length-1
    var row_lhs = 0
    var row_rhs = 1
    */
    var k = i+1
    var hasOpenScope = {
        '[':'6B189E262D7D28EF1FBF946FDFF08716',
        '(':'152370721853AF95444F2F05AB29D4CC',
        '{':-1,
    }
    //me[k]=''
    var K = peekNext(me,++k,ops)
    //var rhs = peekSymbol(me,k,3)
    //JINT[ops[0]](me,i,localstack)
    //localstack[row][row_rhs] += ops[0]+rhs[0][data]+ops[1]
    while(k<K){
        if(JINT[me[k]]){
            localstack = JINT[me[k]](me,k,localstack)
        }
        k++
    }
    //JINT[ops[1]](me,i,localstack)
    //me[rhs[0][index]] = ''
    /*
    if(JINT[hasOpenScope[ops[0]]].length){
        me[k]=localstack[row][row_rhs]
    } else {
        me[k]=localstack[row].join('')
    }
    me[rhs[2][index]] = ops[0]+rhs[0][data]+ops[1]
    */
    return localstack
}
var JSoperator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[1] && rhs[1][data]==OPS.hasa){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data]
            if(this['6B189E262D7D28EF1FBF946FDFF08716'].length==1){
                //w = w.replace(/[\[\]]+/gm,'')
                w //= '[' + w + ']'
            }
            if(localstack[row][row_lhs] == ''){
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w,''])
            }
        } else {
            if(rhs[0][data].match(/\{/)){
                localstack = this['{'](me,i,localstack)
                rhs = peekSymbol(me,i+1,3)
            } else
            if(rhs[0][data].match(/\(/)){
                localstack = this['('](me,i,localstack)
                rhs = peekSymbol(me,i+1,3)
            } else
            if(rhs[0][data].match(/\[/)){
                /*
                if(rhs[2][data]==']'){
                    var row = localstack.length-1
                    var row_lhs = 0
                    var row_rhs = 1
                    var w = '['+rhs[1][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
                    me[i] = ''
                    me[rhs[0][index]] = ''
                    me[rhs[1][index]] = w
                    me[rhs[2][index]] = ''
                
                } else {
                */
                    localstack = this['['](me,i,localstack)
                    rhs = peekSymbol(me,i+1,3)
                //}
            }/* else {*/
                var row = localstack.length-1
                var row_lhs = 0
                var row_rhs = 1
                var w = lhs[0][data]
                var v = rhs[0][data]
                if(localstack[row][row_lhs] == ''){
                    localstack[row][row_lhs] += w
                    if(!rhs[1] || (rhs[1] && rhs[1][data]!=OPS.hasa)){
                        localstack[row][row_rhs] += v
                    }
                } else {
                    localstack.push([w,v])
                }
                if(lhs[2] && lhs[1] && lhs[1][data] == OPS.isa){
                    localstack.push([lhs[2][data],w])
                    me[i] = ''
                    me[rhs[0][index]] = ''
                } else
                if(this['6B189E262D7D28EF1FBF946FDFF08716'].length==1&&rhs[1][data]==']'){
                    me[i] = ''
                    me[lhs[0][index]] = ''
                    me[rhs[0][index]] = '['+lhs[1][data]+']'
                    me[rhs[1][index]] = ''
                    me[lhs[1][index]] = ''
                    me[lhs[2][index]] = ''
                    this['6B189E262D7D28EF1FBF946FDFF08716'].pop()
                } else {
                    me[i] = '='
                }
            //}
        }
    
        return localstack
        },
    '=>':function(me,i,localstack){
        var HASACompiledScope = false
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = this['{'](me,i,localstack)
            rhs = peekSymbol(me,i+1,3)
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = this['('](me,i,localstack)
            rhs = peekSymbol(me,i+1,3)
        } else
        if(rhs[0][data].match(/\[/)){
            /*
            if(rhs[2][data]==']'){
                var row = localstack.length-1
                var row_lhs = 0
                var row_rhs = 1
                var w = '['+rhs[1][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
                me[i] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = w
                me[rhs[2][index]] = ''
            
            } else {
            */
                localstack = this['['](me,i,localstack)
                rhs = peekSymbol(me,i+1,3)
                HASACompiledScope = true
            //}
        }/* else {*/
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')
            var v = ''
            if(HASACompiledScope && !this["6B189E262D7D28EF1FBF946FDFF08716"].length){
                v = rhs[0][data]
            } else {
                var lbrack = '["'
                var rbrack = '"]'
                if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
                    lbrack = lbrack.replace(/\"/,'')
                    rbrack = rbrack.replace(/\"/,'')
                }
                v = lbrack+rhs[0][data].replace(/\W+/gm,'')+rbrack
            }
            me[i] = ''
            me[lhs[0][index]] = ''
            var u = w + v
            if(HASACompiledScope && !this["6B189E262D7D28EF1FBF946FDFF08716"].length){
                if(localstack[row][row_rhs] == ''){
                    localstack[row][row_rhs] += u
                } else {
                    localstack.push(['',u])
                }
            } else {
                if(localstack[row][row_rhs] == ''){
                    localstack[row][row_rhs] += u
                } else {
                    localstack[row][row_rhs] += v
                }
            }
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (!rhs[1] || (rhs[1] && rhs[1][data] && rhs[1][data]!=OPS.hasa && rhs[1][data]!=OPS.isa))
            ){
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
            } else
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (rhs[1] && rhs[1][data] && rhs[1][data]==OPS.isa)
            ){
                localstack.push([u,rhs[2][data]])
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                var next = peekSymbol(me,rhs[2][index]+1,2)
                if(!next[0] || (next[0] && next[0][data]!=OPS.hasa && next[0][data]!=OPS.isa)){
                    me[rhs[2][index]] = ''
                    localstack.push([rhs[2][data],'__local__'])
                }
            } else {
                me[rhs[0][index]] = u
            }
        //}
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("9ACC23D8765224A84121BC737E6C1836", i) // ffast //
        return localstack
            
        },
    '[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        ((rhs[2][data]==']')/* && (rhs[2][data]==OPS.isa)*/)
        ){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[1][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
            me[rhs[2][index]] = ''
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
            localstack = buildscope(this,me,i,localstack,'[]')
        }
        /* else
        if(rhs[1][data]==OPS.isa){
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        }
        */
        return localstack
        },
    ']':function(me,i,localstack){
        if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
            this["6B189E262D7D28EF1FBF946FDFF08716"].pop()
        }
        return localstack
        },
    '(':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("152370721853AF95444F2F05AB29D4CC", i) // lparen //
        return localstack
        },
    ')':function(me,i,localstack){
        if(this["152370721853AF95444F2F05AB29D4CC"].length){
            this["152370721853AF95444F2F05AB29D4CC"].pop()
        }
        return localstack
        },
        /*
    ',':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("B6D00DC1BA038E5901CD6C06B2DAA192", i) // comma //
        return localstack
        },
        */
    "7714F8C839428D0E184EAF11464D3A6E":[['','']], // md5(operationstack) //
    "6B189E262D7D28EF1FBF946FDFF08716":[], // md5(lbrack) //
    "B89B9AC07070CF76C97B285EC04D982C":[], // md5(rbrack) //
    "152370721853AF95444F2F05AB29D4CC":[], // md5(lparen) //
    "EC9962F64DBBC61B566D4D3478A4902A":[], // md5(rparen) //
    "B6D00DC1BA038E5901CD6C06B2DAA192":[], // md5(comma) //
    "9ACC23D8765224A84121BC737E6C1836":[], // md5(ffast) //
    "165A1761634DB1E9BD304EA6F3FFCF2B":[], // md5(isa) //
    "B2FAE65A017B97031EFB1C6DB2AE3658":function(v,i){ // md5(addtostack) //
        this[v].unshift(i)
        },
}
//
"B2FAE65A017B97031EFB1C6DB2AE3658":function(v,i){ // md5(addtostack) //
        this[v].unshift(i)
        /*
        while(this[v].length>9){
            this[v].pop()
        }
        */
        },
//
'[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        ((rhs[1][data]==']') && (rhs[2][data]==OPS.isa))
        ){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
        } else
        if(rhs[1][data]==OPS.isa){
            /*
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            me[i] = ''
            me[rhs[0][index]] = w
            */
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
            //localstack = buildscope(this,me,i,localstack,'[]')
        
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        }
        return localstack
        },
//
'[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        ((rhs[1][data]==']') && (rhs[2][data]==OPS.isa))
        ){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
        } else
        if(rhs[1][data]==OPS.isa){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            //var j = peekNext(me,i+1,'[]')
            /*
            if(localstack[row][row_rhs] == ''){
                localstack[row][row_rhs] += w
            } else {
                localstack.push([w,''])
            }
            */
            me[i] = ''
            //me[j] = ''
            me[rhs[0][index]] = w
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        }
        return localstack
        },
//
function operatorNestedSQbrace(me,i){
    var stacktally = 0
    var lb = '['
    var rb = ']'
    var I = me.length
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var status = false
    if(me[i++]==lb){
        stacktally++
        while( stacktally && i<I ){
            if(me[i]==lb){
                stacktally++
            } else
            if(me[i]==rb){
                stacktally--
            } else
            if(
            me[i]==hasa ||
            me[i]==ffast ||
            me[i]==isa
            ){
                status = true
                break
            } 
            i++
        }
    }
    return status
}
function peekNext(me,i,pttn,r){
    var a = 1
    if(r){
        var I =-1
        while(i>I && me[i] && a){
            if(me[i]==pttn[0]){
                a++
            } else
            if(me[i]==pttn[1]){
                a--
                if(!a){
                    break
                }
            }
            i--
        }
    } else {
        var I = me.length
        while(i<I && me[i] && a){
            if(me[i]==pttn[0]){
                a++
            } else
            if(me[i]==pttn[1]){
                a--
                if(!a){
                    break
                }
            }
            i++
        }
    }
    return i
}
function peekSymbol(me,i,cnt,r){
    var a = []
    if(r){
        var I =-1
        var u = 0
        while(u<cnt && i>I){
            while(i>I && ( i in me ) && me[i].match(/^[\s\n]*$/)){
                i--
            }
            if(me[i]){
                a.push([me[i],i])
            }
            u++
            i--
        }
    } else {
        var I = me.length
        var u = 0
        while(u<cnt && i<I){
            while(i<I && (i in me) && me[i].match(/^[\s\n]*$/)){
                i++
            }
            if(me[i]){
                a.push([me[i],i])
            }
            i++
            u++
        }
    }
    return a
}
//
'[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        (rhs[1][data]==']') &&
        (rhs[2][data]==OPS.isa)
        ){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            /*
            if(localstack[row][row_lhs]==''){
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w,''])
            }
            */
            me[i] = ''
            //me[rhs[1][index]] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        }
        return localstack
        },
//
bbmodules.map(function(u){
        var bblocals = [['',''],]
        /*
        u = u
            .replace(/(\n)/gm,'/n')
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            .split(/\s+/)
        */
        return bbtojs([u,null,bblocals])
        //var ar = bbtojs([u,bbglobals,bblocals])
        //bbglobals = ar[1]
        //bblocals = ar[2]
        //ar[0] = findlocals(ar[0],bblocals)
        //return ar[0]
    })
//
function peekNext(me,i,pttn,r){
    var a = 1
    if(r){
        var I =-1
        while(i>I && me[i] && a){
            if(escape(me[i]).match(escape(pttn[0]))){
                a++
            } else
            if(escape(me[i]).match(escape(pttn[1]))){
                a--
                if(!a){
                    break
                }
            }
            i--
        }
    } else {
        var I = me.length
        while(i<I && me[i] && a){
            if(escape(me[i]).match(escape(pttn[0]))){
                a++
            } else
            if(escape(me[i]).match(escape(pttn[1]))){
                a--
                if(!a){
                    break
                }
            }
            i++
        }
    }
    return i
}
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[1] && rhs[1][data]==OPS.hasa){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data]
            if(localstack[row][row_lhs] == ''){
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w,''])
            }
        } else {
            if(rhs[0][data].match(/\{/)){
                localstack = buildscope(this,me,i,localstack,'{}')
            } else
            if(rhs[0][data].match(/\(/)){
                localstack = buildscope(this,me,i,localstack,'()')
            } else
            if(rhs[0][data].match(/\[/)){
                localstack = buildscope(this,me,i,localstack,'[]')
            } else {
                var row = localstack.length-1
                var row_lhs = 0
                var row_rhs = 1
                var w = lhs[0][data]
                var v = rhs[0][data]
                if(localstack[row][row_lhs] == ''){
                    localstack[row][row_lhs] += v
                } else {
                    localstack.push([w,v])
                }
                if(lhs[2] && lhs[1] && lhs[1][data] == OPS.isa){
                    localstack.push([lhs[2][data],w])
                    me[i] = ''
                    me[rhs[0][index]] = ''
                } else {
                    me[i] = '='
                }
            }
        }
    
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(this,me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(this,me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')
            if(localstack[row][row_lhs]==''){
                localstack[row][row_lhs] = w
            }
            me[lhs[0][index]] = ''
            me[i] = ''
            localstack = buildscope(this,me,i,localstack,'[]')
        } else {
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')
            var lbrack = '["'
            var rbrack = '"]'
            if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
                lbrack = lbrack.replace(/\"/,'')
                rbrack = rbrack.replace(/\"/,'')
            }
            var v = lbrack+rhs[0][data].replace(/\W+/gm,'')+rbrack
            me[i] = ''
            me[lhs[0][index]] = ''
            /*
            if(lhs[1] && lhs[1][data] && lhs[1][data]==OPS.hasa){
                w = '["'+w+'"]'
            }
            */
            var u = w + v
            if(localstack[row][row_rhs] == ''){
                localstack[row][row_rhs] += u
            } else {
                localstack[row][row_rhs] += v
            }
            //if(rhs[1] && rhs[1][data] && rhs[1][data]!=OPS.isa){
                //me[rhs[0][index]] = u
            //}
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (!rhs[1] || (rhs[1] && rhs[1][data] && rhs[1][data]!=OPS.hasa && rhs[1][data]!=OPS.isa))
            ){
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
                //localstack[row][row_lhs] += lhs[2][data]
            } else
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (rhs[1] && rhs[1][data] && rhs[1][data]==OPS.isa)
            ){
                localstack.push([u,rhs[2][data]])
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                var next = peekSymbol(me,rhs[2][index]+1,2)
                if(!next[0] || (next[0] && next[0][data]!=OPS.hasa && next[0][data]!=OPS.isa)){
                    me[rhs[2][index]] = ''
                    localstack.push([rhs[2][data],'__local__'])
                }
            } else {
                me[rhs[0][index]] = u
            }
        }
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("9ACC23D8765224A84121BC737E6C1836", i) // ffast //
        return localstack
            
        },
    '[':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        return localstack
        },
    ']':function(me,i,localstack){
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("B89B9AC07070CF76C97B285EC04D982C", i) // rbrack //
        if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
            this["6B189E262D7D28EF1FBF946FDFF08716"].pop()
        }
        return localstack
        },
    '(':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("152370721853AF95444F2F05AB29D4CC", i) // lparen //
        return localstack
        },
    ')':function(me,i,localstack){
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("EC9962F64DBBC61B566D4D3478A4902A", i) // rparen //
        if(this["152370721853AF95444F2F05AB29D4CC"].length){
            this["152370721853AF95444F2F05AB29D4CC"].pop()
        }
        return localstack
        },
        /*
    ',':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("B6D00DC1BA038E5901CD6C06B2DAA192", i) // comma //
        return localstack
        },
        */
    "7714F8C839428D0E184EAF11464D3A6E":[['','']], // md5(operationstack) //
    "6B189E262D7D28EF1FBF946FDFF08716":[], // md5(lbrack) //
    "B89B9AC07070CF76C97B285EC04D982C":[], // md5(rbrack) //
    "152370721853AF95444F2F05AB29D4CC":[], // md5(lparen) //
    "EC9962F64DBBC61B566D4D3478A4902A":[], // md5(rparen) //
    "B6D00DC1BA038E5901CD6C06B2DAA192":[], // md5(comma) //
    "9ACC23D8765224A84121BC737E6C1836":[], // md5(ffast) //
    "165A1761634DB1E9BD304EA6F3FFCF2B":[], // md5(isa) //
    "B2FAE65A017B97031EFB1C6DB2AE3658":function(v,i){ // md5(addtostack) //
        this[v].unshift(i)
        /*
        while(this[v].length>9){
            this[v].pop()
        }
        */
        },
}
//
'<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            if(!rhs[1][data].match(OPS.hasa)){
                me[i] = '='
            } else {
                var w = lhs[0][data].replace(/\W+/gm,'')
                localstack.push([w,''])
                me[i] = ''
            }
        } else
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[0][data].replace(/\W+/gm,'')
            me[lhs[0][index]]+=me[rhs[0][index]]
            me[i] = ''
            me[rhs[0][index]] = ''
            localstack.push([w,v])
            if(
            rhs[1][data].match(/\)/) &&
            rhs[2][data].match(/\{/)
            ){
                var x = w+'='+v+'\n'
                var f = rhs[2][data].match(/^\{[\n\s]*/)[0]
                f = f.replace(/\w/,x)
                me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
            }
        } else 
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\s\n]*\(/) &&
       !rhs[1][data].match(/,/) &&
        rhs[2][data].match(/^[\s\n]*\)/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[1][data].replace(/\W+/gm,'')
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = ''
            me[rhs[2][index]] = ''
            localstack.push([w,v])
        } 
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("165A1761634DB1E9BD304EA6F3FFCF2B", i) // isa //
        return localstack
        },
//
//.replace(/(<=|=>)/gm,'##$1##')
//.split(/#+/)
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        me[i] = ''
        if(rhs[0][data].match(/^\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/^\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/^\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            me[lhs[0][index]] = ''
            localstack.push([lhs[0][data],rhs[0][data]])
            if(rhs[1][data]!=OPS.hasa){
                me[rhs[0][index]] = ''
            }
        }
    
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        me[i] = ''
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            me[lhs[0][index]] = ''
            localstack.push([lhs[0][data],rhs[0][data]])
            if(
            (rhs[1][data]!=OPS.isa) &&
            (rhs[1][data]!=OPS.hasa)
            ){
                me[rhs[0][index]] = ''
            }
        
        }
    
        return localstack
            
        },
}
//
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(\w+|\d+|\[|\]|\(|\)|\,|<=|=>)/gm,'  $1  ')
            //.split(/\s+/)
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
//
    '=>=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
        
        }
    
        return localstack
            
        },
//
bbmodules.map(function(u){
        u = u
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            //.replace(/\s+/gm,' ')
            //.split(/\s+/)
            .split(/\#+/)
        var ar = bbtojs([u,bbglobals,bblocals])
        bbglobals = ar[1]
        bblocals = ar[2]
        ar[0] = findlocals(ar[0],bblocals)
        return ar[0]
    })
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var N = xfe.length-1
        if(xfe[N]){
            //xfe[N][0] += lhs[0][data]
            if(rhs[1][data]!=OPS.hasa){
                xfe[N][1] += rhs[0][data]
            }
        }
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var N = xfe.length-1
        if(xfe[N]){
            xfe[N][1] += rhs[0][data]
            if(lhs[1][data]==OPS.isa){
                xfe.push([rhs[0][data],''])
            }
        }
    
        return localstack
            
        },
    '=>=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
    
        return localstack
            
        },
}
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            if(!rhs[1][data].match(OPS.hasa)){
                me[i] = '='
            } else {
                var w = lhs[0][data].replace(/\W+/gm,'')
                localstack.push([w,''])
                me[i] = ''
            }
        } else
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[0][data].replace(/\W+/gm,'')
            me[lhs[0][index]]+=me[rhs[0][index]]
            me[i] = ''
            me[rhs[0][index]] = ''
            localstack.push([w,v])
            if(
            rhs[1][data].match(/\)/) &&
            rhs[2][data].match(/\{/)
            ){
                var x = w+'='+v+'\n'
                var f = rhs[2][data].match(/^\{[\n\s]*\w/)[0]
                f = f.replace(/\w/,x)
                me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
            }
        } else 
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\s\n]*\(/) &&
       !rhs[1][data].match(/,/) &&
        rhs[2][data].match(/^[\s\n]*\)/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[1][data].replace(/\W+/gm,'')
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = ''
            me[rhs[2][index]] = ''
            localstack.push([w,v])
        } 
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = '['+rhs[0][data].replace(/\W+/gm,'')+']'
            me[i] = ''
            me[lhs[0][index]] = ''
            if(lhs[1][data]==OPS.hasa){
                w = '['+w+']'
            }
            localstack[row][row_rhs] += w + v
            if(rhs[1][data]!=OPS.isa){
                me[rhs[0][index]] = ''
            }
        }
        return localstack
            
        },
    '=>=>':function(me,i,localstack){
        return localstack
            
        },
}
//
    /*
    '[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var row = localstack.length-1
        var row_lhs = 0
        var row_rhs = 1
        if(lhs[0][data]==isa){
            var w = lhs[1][data].replace(/\W+/gm,'')
            localstack.push([w,''])
        }
        return localstack
            
        },
    ']':function(me,i,localstack){
        return localstack
    
        },
    '(':function(me,i,localstack){
        return localstack
            
        },
    ')':function(me,i,localstack){
        return localstack
            
        },
    ',':function(me,i,localstack){
        return localstack
            
        },
    */
//
function buildscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var result_rhs = []
    var data = 0
    var index = 1
    var isaFirstCall = false
    //for(var i=i;i<I;i+=2){
    while(i<I){
        var rhs = peekSymbol(me,i,3)
        if(
        ((me[rhs[0][index]]==hasa) || (me[rhs[0][index]]==ffast)) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/^[\n\s]*\[/) &&
        me[rhs[2][index]].replace(/\W+/gm,'').match(/^[\n\s]*\]/) 
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            if(isaFirstCall){
                result_rhs += '["'+w+'"]'
            } else {
                result += '["'+w+'"]'
            }
            me[rhs[0][index]] = me[rhs[1][index]] = me[rhs[2][index]] = ''
            i+=3
        } else
        if(
        ((me[rhs[0][index]]==hasa) || (me[rhs[0][index]]==ffast)) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/)
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            if(isaFirstCall){
                result_rhs += '["'+w+'"]'
            } else {
                result += '["'+w+'"]'
            }
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(isa)){
                me[rhs[1][index]] = ''
            } else {
                i--
            }
            i+=2
        } else
        if(
        (me[rhs[0][index]].replace(/\W+/gm,'').match(/[\w\d]+/)) &&
        (me[rhs[1][index]]==isa)
        ){
            if(isaFirstCall==false){
                isaFirstCall = true
                result_rhs = ''
                me[rhs[1][index]] = ''
                result_rhs += rhs[2][data].replace(/\W+/gm,'')
                me[rhs[2][index]] = ''
                i+=3
            } else {
                localstack.push([result,result_rhs])
                result_rhs = rhs[0][data]
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                i+=2
            }
        } else {
            break
        }
    }
    if(isaFirstCall){
        localstack.push([result,result_rhs])
    } else {
        localstack.push([r,result])
    }
    return localstack
}
//
a[0].map(function(u,i,me){
        switch(u){
        case isa:
            var data = 0
            var index = 1
            var lhs = peekSymbol(me,i-1,3,'rev')
            var rhs = peekSymbol(me,i+1,3)
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
            ){
                if(!rhs[1][data].match(hasa)){
                    me[i] = '='
                } else {
                    var w = me[lhs[0][index]].replace(/\W+/gm,'')
                    var v = me[rhs[0][index]].replace(/\W+/gm,'')
                    a[bblocals] = buildscope(me,rhs[1][index],w,v,a[bblocals])
                    me[i] = ''
                    me[rhs[0][index]] = ''
                }
            } else
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            rhs[2][data] &&
            lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
            rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[0][data].replace(/\W+/gm,'')
                me[lhs[0][index]]+=me[rhs[0][index]]
                me[i] = ''
                me[rhs[0][index]] = ''
                a[bblocals].push([w,v])
                if(
                rhs[1][data].match(/\)/) &&
                rhs[2][data].match(/\{/)
                ){
                    var x = w+'='+v+'\n'
                    var f = rhs[2][data].match(/^\{[\n\s]*\w/)[0]
                    f = f.replace(/\w/,x)
                    me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
                }
            } else 
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            rhs[2][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\s\n]*\(/) &&
           !rhs[1][data].match(/,/) &&
            rhs[2][data].match(/^[\s\n]*\)/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[1][data].replace(/\W+/gm,'')
                me[i] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                me[rhs[2][index]] = ''
                a[bblocals].push([w,v])
            } 
            
            break
        case hasa:
            var data = 0
            var index = 1
            var lhs = peekSymbol(me,i-1,3,'rev')
            var rhs = peekSymbol(me,i+1,3)
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\s\n]*\[/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[1][data].replace(/\W+/gm,'')
                if(operatorNestedSQbrace(me,rhs[0][index])){
                    a[bblocals] = buildscope(me,rhs[1][index],w,v,a[bblocals])
                } else {
                    
                    //a[bblocals] = buildHASAscope(me,w,rhs[0][index],a[bblocals])
                }
            }
            
            break
        case ffast:
            
            break
        default:
            break
        }
        return u
    })
//

function matchCURLbrace(){

}
function buildISAscope(){

}
function buildHASAscope(){

}
function buildFFASTscope(){

}
//
            if(isaFirstCall==false){
                isaFirstCall = true
                result_rhs = ''
                me[rhs[1][index]] = ''
                result_rhs += rhs[2][data].replace(/\W+/gm,'')
                me[rhs[2][index]] = ''
                i+=3
            } else {
                localstack.push([result,result_rhs])
                result_rhs = rhs[0][data]
                i++
            }
            //var w = rhs[0][data].replace(/\W+/gm,'')
            //result_rhs += w
            //me[rhs[0][index]] = ''
            //if(!rhs[2][data].match(isa)){
            //    me[rhs[1][index]] = ''
            //}
            //me[rhs[2][index]] = ''
            //result_rhs += rhs[2][data].replace(/\W+/gm,'')
            //i+=3//i++//i+=2
//
function buildISAscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var data = 0
    var index = 1
    //for(var i=i;i<I;i+=2){
    //while(i<I){
        //var lhs = peekSymbol(me,i-1,3)
        var rhs = peekSymbol(me,i+1,1)
        if(
        (me[rhs[0][index]]==isa) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/)
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            result += '["'+w+'"]'
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(hasa)){
                me[rhs[1][index]] = ''
            }
            //i+=2
        } /*else {
            break
        }*/
    //}
    localstack.push([r,result])
    return localstack
}
function buildscope(){

}
//
function matchSQbrace(me,lhs,i,localstack){
    var stacktally = 0
    var lb = '['
    var rb = ']'
    var I = me.length
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    if(me[i++]==lb){
        stacktally++
        while( stacktally && i<I ){
            if(me[i]==lb){
                stacktally++
            } else
            if(me[i]==rb){
                stacktally--
            } else
            if(me[i]==hasa || me[i]==ffast){
                var data = 0
                var index = 1
                var lhs = peekSymbol(me,i-1,3,'rev')
                var rhs = peekSymbol(me,i+1,3)
                var w = lhs[0][data]
                var s = rhs[0][data]
                //localstack = buildISAscope(me,rhs[1][index],w,s,localstack)
                //localstack = buildHASAscope(me,rhs[1][index],w,s,localstack)
                //v = buildHASAscope(me,rhs[1][index],w,s,localstack)
                //localstack.push([w,s+v])
                //me[i] = ''
               // me[rhs[1][index]] = ''
            } else 
            if(me[i]==isa){
            
            }
            i++
        }
    }
    return localstack
}
//
a.match(/\w+[\n\s]*<=[\n\s]*[\w+\d+]+/gm) // ["callstack <= updatecallstack", "_ <= archive"]
a.match(/(\[?\w+\]?[\n\s]*=>[\n\s]*\[?[\w+\d+]+\]?)+/gm) // ["__ => [gpi]", "[gpl] => [gpc]"]
//
function buildISAscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var data = 0
    var index = 1
    //for(var i=i;i<I;i+=2){
    while(i<I){
        var lhs = peekSymbol(me,i-1,3)
        var rhs = peekSymbol(me,i+1,3)
        if(
        ((me[rhs[0][index]]==isa) &&
        (me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/))
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            result += '["'+w+'"]'
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(isa)){
                me[rhs[1][index]] = ''
            }
            i+=2
        } else {
            break
        }
    }
    localstack.push([r,result])
    return localstack
}
//
    bbmodules.map(function(u){
        u = u
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(<=|=>)+/gm,'##$1##')
            //.replace(/^\s*\(\s*(\w+|\d+)\s*((\W{1,3})\s*(\w+|\d+))?\s*\)/gm,'if($1$2)')
            //.replace(/([\[\]\(\)\,\{\}]|<=|=>)+/gm,'##$1##')
            //.Repack()
            .split(/#+/)
        var ar = bbtojs([u,bbglobals,bblocals])
        bbglobals = ar[1]
        bblocals = ar[2]
        //ar[0] = ar[0].join('')
        ar[0] = findlocals(ar[0],bblocals)
        return ar[0]
    })
//
var w = me[i-1].replace(/\W+/gm,'') // /(.*)\w+(.*)$/
//
function buildhasascope(me,i){
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = ''
    for(var i=i;i<I;I+2){
        if(
            ((me[i]==hasa) || (me[i]==ffast)) &&
            (me[i+1].match(/,/))
        ){
            var w = me[i+1].split(/,/)
            result += '['+w[0].replace(/\s+/g,'')+']'
            me[i] = ''
            me[i+1] = me[i+1].replace(w[0],'')
            break
        } else {
            break
        }
    }
    return result
}
//
function bbtojs(a){
    var bbglobals = 1
    var bblocals = 2
    //var s = ''
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    a[0].map(function(u,i,me){
        switch(u){
        case isa:
            if(
            me[i-1] && 
            me[i+1] && 
            me[i-1].match(/\([^\)]+$/) &&
            me[i+1].match(/^[^\)]+$/)
            //((me[i+2]==hasa)||(me[i+2]==ffast))
            ){
                var w = me[i-1].split(/\(/g)
                var v = me[i+1] + buildhasascope(me,i+2)
                a[bblocals].push([w[1],v])
                me[i-1] = w[0] + '(' + v
                me[i] = ''
                me[i+1] = ''
            } else
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\(\s*\w+\s*\W{1,3}\s*$/) &&
            //me[i-1].match(/\w+\W{1,3}$/) //&&
            me[i+1].match(/^\s*\w+|\d+\s*\)/)
            ){
                me[i] = ''
                var v = me[i-1].split(/\(/g)
                var w = me[i+1].split(/\)/g)
                me[i-1] += w[0]+')\n'+v[v.length-1].replace(/\W+/,'')+'='+w[0]
                me[i+1] = me[i+1].replace(w[0],'')
                a[bblocals].push([w[0]])
            } else 
            if(
            me[i-1] &&
            me[i+1] &&
            //me[i-1].match(/\)\n*\s*\w+$/) &&
            //me[i-1].match(/.*\)\n*\s*\w+$/) //&&
            me[i-1].match(/\w+\s*$/) &&
            me[i+1].match(/^\s*\n*\(\s*\w+|\d+\s*\)/)
            //me[i-1].match(/\)\n*\s*\w+\s*$/) 
            ){
                var v = me[i-1].split(/\)/)
                var w = me[i+1].match(/\((\w+|\d+)\)/)
                v[1] = v[1].replace(/\W+/g,'')
                me[i-1] = me[i-1].replace(v[1],'')
                me[i] = ''
                me[i+1] = v[1]
                a[bblocals].push([v[1],w[1]])
            } else {
                me[i] = '='
            }
            break
        case hasa:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        case ffast:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        default:
            break
        }
        return u
    })
    return a.join('')
}
//
a[0].map(function(u,i,me){
        switch(u){
        case isa:
            if(
            me[i-1] && 
            me[i+1] && 
            me[i-1].match(/\([^\)]+$/) &&
            me[i+1].match(/^[^\)]+$/)
            //((me[i+2]==hasa)||(me[i+2]==ffast))
            ){
                var w = me[i-1].split(/\(/g)
                var v = me[i+1] + buildhasascope(me,i+2)
                a[bblocals].push([w[1],v])
                me[i-1] = w[0] + '(' + v
                me[i] = ''
                me[i+1] = ''
            } else
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\(\s*\w+\s*\W{1,3}\s*$/) &&
            //me[i-1].match(/\w+\W{1,3}$/) //&&
            me[i+1].match(/^\s*\w+|\d+\s*\)/)
            ){
                me[i] = ''
                var v = me[i-1].split(/\(/g)
                var w = me[i+1].split(/\)/g)
                me[i-1] += w[0]+')\n'+v[v.length-1].replace(/\W+/,'')+'='+w[0]
                me[i+1] = me[i+1].replace(w[0],'')
                a[bblocals].push([w[0]])
            } else 
            if(
            me[i-1] &&
            me[i+1] &&
            //me[i-1].match(/\)\n*\s*\w+$/) &&
            //me[i-1].match(/.*\)\n*\s*\w+$/) //&&
            me[i-1].match(/\w+\s*$/) &&
            me[i+1].match(/^\s*\n*\(\s*\w+|\d+\s*\)/)
            //me[i-1].match(/\)\n*\s*\w+\s*$/) 
            ){
                var v = me[i-1].split(/\)/)
                var w = me[i+1].match(/\((\w+|\d+)\)/)
                v[1] = v[1].replace(/\W+/g,'')
                me[i-1] = me[i-1].replace(v[1],'')
                me[i] = ''
                me[i+1] = v[1]
                a[bblocals].push([v[1],w[1]])
            } else {
                me[i] = '='
            }
            break
        case hasa:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        case ffast:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        default:
            break
        }
        return u
    })
//
function buildhasascope(me,i){
    var hasa = '=>'
    var ffast = '=>=>'
    //var base = i
    var I = me.length
    var result = ''
    for(var i=i;i<I;I+2){
        if(
            ((me[i]==hasa) || (me[i]==ffast)) &&
            (me[i+1].match(/,/))
        ){
            var w = me[i+1].split(/,/)
            result += '['+w[0].replace(/\s+/g,'')+']'
            //me[i] = ''
            //me[i+1] = ''
            me[i+1] = me[i+1].replace(w[0],'')
            /*
            if(i!=base){
                
            }
            */
            break
        } else {
            break
        }
    }
    return result
}
//
function bbtojs(a){
    var bbglobals = 1
    var bblocals = 2
    var s = ''
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    a[0].map(function(u,i,me){
        /*
        if(me[i+1] && (me[i+1] == isa)){
            s += u + '=' + me[i+2]
        }
        */
        if((u==isa) && me[i-1] && me[i-1].match(/\([^\)]+$/)){
            var w = me[i-1].split(/\(/)
            var v = me[i+1] + buildhasascope(me,i+2)
            a[bblocals].push([w[1],v])
            me[i-1] = w[0] + '(' + v
            me[i] = ''
            me[i+1] = ''
        } else
        if((u==isa)){
            me[i] = '='
        }
        return u
    })
    return a.join('')
}