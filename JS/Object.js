/*

TITLE: 
  OBJECT.JS

AUTHOR: Seagat2011 ( Michelle Antonello )
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  JSCASETool / README

DESCRIPTION: 
  JINSIL / JINT Bluebird convert stacktraces,
  inline macros, and vars to javascript

INPUT:
  _

OUTPUT:
  _
  
SCRIPT TYPE: 
  prototype shell

*/

Object.prototype.asTAG = function(u){
    var result = "<"+u+">"+this.toString()+"</"+u+">"
    return result
}
Object.prototype.endsWith = function(s,flags){
    flags || (flags = "");
    var re = new RegExp("\\"+s+"$",flags)
    var result = (this.match(s) && true);
    return result
}
Object.prototype.Clone = function() {
    var result
    var status = {
        'object': function(w) {
            var o
            if (w instanceof Array) {
                o = [];
                w.map(function(v) {
                    o.push(v);
                    return v
                })
            } else {
                o = {}
                for (var i in w) {
                    if (w.hasOwnProperty(i)) {
                        o[i] = w[i]
                    }
                }
            }
            return o
        },
        'string': function(w) {
            return w
        },
        'number': function(w) {
            return w
        },
        'default': function(w) {
            return {}
        },
    }
    if (status[typeof (this)]) {
        result = status[typeof (this)](this)
    } else {
        result = status['default'](this)
    }
    
    return result
}
Object.prototype.Print = function() {
    var result
    if (arguments[0] == false) {
        result = JSON.stringify(this)
    } else {
        result = JSON.stringify(this, 1, 1)
    }
    return result
}
Object.prototype.PrintAsString = function(v) {
    var result = (this.Print()).toString()
    if (v) {
        result = escape(result)
        .replace(/^\%22/, '')
        .replace(/\%22$/, '')
    }
    return result
}
Object.prototype.dup = function(j) {
    var s = this.toString();
    var v = this.toString();
    while (j--) {
        s += v
    }
    return s
}
Object.prototype.addNode = function(){
    var w = arguments[0];
    var pid = arguments[1];
    var qnode = new node(w,pid)
    this.push(qnode)
    return qnode
}
Object.prototype.findIndexOf = function(w){
    var result = -1;
    var I = this.length
    for(var i=0;i<I;i++){
        var matchFound = (this[i].name == w)
        if(matchFound){
            result = i
            break
        }
    }
    return result
}
Object.prototype.noParams = function(){
    result = this.toString().replace(/\(.*\)/,"")
    return result
}
Object.prototype.paramsOnly = function(){
    result = this.toString().replace(/^.*(\(.*\))/,"$1")
    return result
}
Object.prototype.addCodeBody = function(spacer,obj,ref,className,cb){
    var self = this;
    spacer || (spacer = "");
    var pad = spacer
    var codeBody = spacer
    self.push(spacer+"{");
    if(!spacer){
        pad = " "
    }
    if(obj && obj.nodes && obj.nodes.length){
        if(className){
            self.push(pad.dup(1) + "var _m = new "+className)
        }
        obj.nodes.traceV2(self,pad,1,ref,cb)
    }
    else{
        self.push(codeBody);
    }
    self.push(spacer+"}"); 
}
Object.prototype.addMemberCodeBody = function(lib,spacer,obj,ref,cname,cb){
    spacer || (spacer = "  ");
    var self = this
    var codeBody = "  "
    self.push("{");
    self.push("  var self = this;");
    lib.ma_memberAttribute.map(
    function(ma)
    {
        self.push("  this."+ma+" = 0;");
    })
    lib.m_memberProperty.map(
    function(mp)
    {
        self.push("  this."+mp.noParams()+" = function"+mp.paramsOnly());
        if(obj[mp] && obj[mp].nodes && obj[mp].nodes.length){
            self.addCodeBody(spacer,obj[mp],ref,cname,cb)
        }
        else{
            self.addCodeBody(codeBody)
        }
    });
    self.push("}");
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
            return u
        })
    }
    else{
        code.push("")
    }
}
Object.prototype.trace = function(code,tab,reps){
    var pad = tab.dup(reps);
    this.map(
    function(u){
        code.push(pad + "this." + u.name.noParams() + " = function" + u.name.paramsOnly() + "{")
        u.code.length && code.push(tab.dup(reps+1) + u.code.replace(/\n/g,"\n"+tab.dup(reps+1)))
        u.nodes && u.nodes.map(
        function(v){
            code.push(tab.dup(reps+1) + "self." + v.name)
            return v
        })
        code.push(pad + "}")
        u.nodes && u.nodes.trace(code,tab,reps)
        return u
    })
}
Object.prototype.updateTrace = function(w,indent,parent){
    var result
    var i = this.findIndexOf(w)
    var indexNotFound = (i<0);
    var tailNodeReached = (indent == 0);
    if(indexNotFound){
        i = this.length - 1
    }
    var indexOutOfRange = (indexNotFound  && (i<0));
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
}