/*

TITLE: 
  JSCASETOOL.JS

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
  entity => godparent => indent <= indent

OUTPUT:
  var entity = []
  entity["godparent"] = []
  entity["godparent"]["indent"] = indent
  
SCRIPT TYPE: 
  syntax translation tool

*/

var VALUE = "textContent"
if(window.navigator.vendor.match(/google/i)){
    VALUE = "value"
}
function loader() {
    srcTranslated.setLine('')
}
function clear_window() {
    srcTranslated.setLine('')
}
function MD5() {
    srcTranslated.setLine( 
        'stacktrace - ' + 
        Math.md5(srcStackTrace.getLines())
        /*    + 
        '\nsnapshot - ' + 
        Math.md5(srcSnapShot.value)
        */
        )
}
var intf = {
    'default': function() { // intf 'default' //
        srcTranslated.setLine('..Functionality not implemented')
        },
    0: function() { // Procedural-Designer //
        return srcStackTrace.getLines().split(/\n+/)
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
    "__main__": function(params) { // msg handler //
        intf.archive = {}
        intf["inverse.archive"] = {}
        var s = []
        var tmpCache = {}
        var added = {}
        var screenBuffer = params.split(/\n+/gm)
        var buffer = params.split(/\n+/gm)
        var renameObject = false
        var moduleLength = 0
        buffer.map(function(U,i) {
            var u = U.replace(/\s+/g, '')
            var v = U.replace(/\s+/g, '')
            var renameObjectLR;
            var renameObjectRL;
            u.match(/\s*>>\s*/) && (renameObjectLR = u.split(/\s*>>\s*/));
            u.match(/\s*<<\s*/) && (renameObjectRL = u.split(/\s*<<\s*/));
            if(renameObjectLR){
                v = renameObjectLR[0]
                u = renameObjectLR[1]
                screenBuffer[i] = u
                !renameObject && (renameObject = true);
            }
            else
            if(renameObjectRL){
                u = renameObjectRL[0]
                v = renameObjectRL[1]
                screenBuffer[i] = u
                !renameObject && (renameObject = true);
            }
            if(!added[u]){
                added[u] = 1
                intf.archive[u] = moduleLength
                intf["inverse.archive"][moduleLength.toString()] = u
                tmpCache[u] = { code:"" }
                if(intf["callstack.cache"][v]){
                    tmpCache[u].code = intf["callstack.cache"][v].code
                }
                if(u.match(/\(.*\)/)){
                    s.push(u.asTAG("option"))
                }
                moduleLength++
            }
            return u
        })
        if(renameObject){
            srcStackTrace.setLines(screenBuffer.join("\n"))
        }
        intf["callstack.cache"] = tmpCache
        selBoxModules.style.display = "none"
        selBoxModules.innerHTML = s.join('')
        selBoxModules.style.display = "block"
        divLibrary[VALUE] = intf.module.join('%%')
        refresh_module(selBoxModules.selectedIndex)
        },
    "archive": {},
    "inverse.archive": {},
    "module": [],
    "callstack.cache": {},
    "callstack": {},
} // intf {}
function refresh_module(i) {
    try{
        intf.module = divLibrary[VALUE].split('%%')
    }
    catch(e){
        intf.module = [divLibrary[VALUE]]
    }
    (selected.value == null) && (selected.value = 0);
    var _str_ = srcCode.getLines()
    var code = _str_.join('\n')
    if (selected.value < intf.module.length){
        intf.module[selected.value] = code
    } else {
        intf.module.push(code)
    }
    var u = intf["inverse.archive"][selected.value]
    intf["callstack.cache"][u].code = code
    srcCode.setLine(intf.module[i] || '')
    selected.value = i
    divLibrary[VALUE] = intf.module.join('%%')
}
var sourceLibrary = 
[
    function() { /* text shift+F11 */
        return text_shift_F11
    }, 
    function() { /* Ada */
        return Ada
    }, 
    function() { /* Assembler */
        return Assembler
    }, 
    function() { /* C/C++ */
        return C_C_plusplus
    }, 
    function() { /* C# */
        return C_sharp
    }, 
    function() { /* CSS3 */
        return CSS3
    }, 
    function() { /* D */
        return D
    }, 
    function() { /* Difference */
        return Difference
    }, 
    function() { /* Errorlist */
        return Errorlist
    }, 
    function() { /* Fortran */
        return Fortran
    }, 
    function() { /* HTML F12 */
        return HTML_F12
    }, 
    function() { /* Java */
        return Java
    }, 
    function() { /* JavaScript */
        return JSoperator
    }, 
    function() { /* Lisp */
        return Lisp
    }, 
    function() { /* Lua */
        return Lua
    }, 
    function() { /* Matlab */
        return Matlab
    }, 
    function() { /* Makefile shift+Ctl+F11 */
        return Makefile_shift_Ctl_F11
    }, 
    function() { /* Pascal */
        return Pascal
    }, 
    function() { /* Perl */
        return Perl
    }, 
    function() { /* PHP */
        return PHP
    }, 
    function() { /* Properties */
        return Properties
    }, 
    function() { /* Python */
        return Python
    }, 
    function() { /* Ruby */
        return Ruby
    }, 
    function() { /* Shell */
        return Shell
    }, 
    function() { /* SQL */
        return SQL
    }, 
    function() { /* TCL */
        return TCL
    }, 
    function() { /* TeX */
        return TeX
    }, 
    function() { /* VB */
        return VB
    }, 
    function() { /* VBScript */
        return VBScript
    }, 
    function() { /* Verilog */
        return Verilog
    }, 
    function() { /* VHDL */
        return VHDL
    }, 
    function() { /* XML shift+F12 */
        return XML_shift_F12
    }, 
]
sourceLibrary['default'] = function() {
    return this[12]()
}
function blueBirdToJS(a) {
    var blueBirdglobals = 1
    var blueBirdlocals = 2
    var operator
    if (sourceLibrary[selBoxToSource.selectedIndex]) {
        operator = sourceLibrary[selBoxToSource.selectedIndex]()
    } else {
        operator = sourceLibrary['default']()
    }
    a[0].map(function(u, i, me) {
        if (operator[u]) {
            /*a[blueBirdlocals] = */operator[u](me, i, a[blueBirdlocals])
        }
        return u
    })
    a[0] = a[0]
    .join('')
    .replace(/\/n/g, '\n')
    return a
}
function findlocals(ar, locs) {
    locs.map(function(w) {
        if (w.length > 1) {
            if (ar.match(w[0])) {
                ar = ar.replace(w[0], w[1])
            }
        }
        return w
    })
    return ar
}
function generate_module() {
    var tab = '  '
    var buffer = intf[0]()
    var callstack = new node("root")
    intf["__main__"](buffer.join("\n"), "force");
    var blueBirdmodules = [XFE] // divLibrary[VALUE].split('%%') //
    var blueBirdglobals = [['', ''], ]
    blueBirdmodules.map(function(u) {
        var blueBirdlocals = [['', ''], ];
        /*
        u = u
            .replace(/(\n)/gm,'/n')
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            .split(/\s+/)
        */
        return blueBirdToJS([u, null, blueBirdlocals])
    })
    buffer.map(function(n) {
        if(!n.match(/^\/\//)){
            var idx = n.match(/^\s+/) || {length: 0}
            if(idx.length){
                idx = idx[0].split("")
            }
            var indent = idx.length
            var w = n.replace(/\s+/g, '')
            var qnode = callstack.nodes.updateTrace(w,indent)
            if(qnode){
                if(qnode.name in intf["callstack.cache"]){
                    qnode.code = intf["callstack.cache"][qnode.name].code;
                }
                intf["callstack.cache"][qnode.name] = qnode
            }
        }
        return n
    })
    var cstart = [];
    intf["callstack"] = callstack
    intf["callstack"].REGEX.length = 0;
    var _n_ = 
    function(n)
    {
        var w = n.replace(/\s+/g, '');
        intf["callstack"].REGEX[g_reModule](w) ||
        intf["callstack"].REGEX[g_reGlobalAttribute](w) ||
        intf["callstack"].REGEX[g_reGlobal](w) ||
        intf["callstack"].REGEX[g_reAttribute](w) ||
        intf["callstack"].REGEX[g_reMemberAttribute](w) ||
        intf["callstack"].REGEX[g_reMemberProperty](w) ||
        intf["callstack"].REGEX[g_reProperty](w) ||
      //intf["callstack"].REGEX[g_reConstructor](w) ||
        intf["callstack"].REGEX[g_reGraph](w);
        return n
    }
    buffer.map(_n_)
    var tmpcache = {}
    var gp_cb = function(u,ref)
    {
        var result = ref
        if(u.match(/^g[a]?_/))
        {
            result = ""
        }
        return result
    }
    var p_cb = function(u,ref)
    {
        var result = ref
        if(u.match(/^g[a]?_/))
        {
            result = ""
        }
        return result
    }
    var _ga_ = function(ga)
    {
        if(!tmpcache[ga]){
            cstart.push("var "+ga+" = 0;");
            tmpcache[ga] = 1
        }
    }
    var _gp_ = function(gp)
    {
        if(!tmpcache[gp]){
            var cname = _gp_._className      
            cstart.push(""); 
            cstart.push("function "+gp)
            cstart.addCodeBody(null,intf["callstack.cache"][gp],"_m.",cname,gp_cb);
            tmpcache[gp] = 1
        }
    }
    var _p_ = function(p)
    {
        if(!tmpcache[p]){
            var lib = _p_._lib
            cstart.push(lib.name+".prototype."+p.noParams()+" = function"+p.paramsOnly())
            cstart.addCodeBody(null,intf["callstack.cache"][p],"this.","",p_cb);      
            tmpcache[p] = 1
        }
    }
    var _a_ = function(a)
    {
        if(!tmpcache[a]){
            var lib = _a_._lib
            cstart.push(lib.name+".prototype."+a+" = 0");
            tmpcache[a] = 1
        }
    }
    var _lib_ = function(lib)
    {
        tmpcache = {}
        var className = lib._constructor ? lib._constructor : (lib.name +"()")
        _p_._lib = lib
        _a_._lib = lib
        _gp_._lib = lib
        _gp_._className = className
        cstart.push("","\/\/ "+lib.name+".js","");
        lib.ga_globalAttribute.map(_ga_)
        lib.g_globalProperty.map(_gp_)
        if(cstart[cstart.length-1] != "")
        {
            cstart.push("");
        }
        cstart.push("function "+className);
        cstart.addMemberCodeBody(lib,"  ",intf["callstack.cache"],"self.","",p_cb);
        lib._property.map(_p_)
        lib._attribute.map(_a_)
        cstart.push("")
    }
    intf["callstack"].REGEX.map(_lib_);
    srcTranslated.setLine(cstart.join('\n'))
}
function g_switch() {
    try {
        var args = arguments[1]
        var result = arguments[0][args]
    } catch (e) {
        var result = arguments[0]['default']
    }
    return result
}
function translatorTool() {
    g_switch(intf, "__main__")(srcStackTrace.getLines())
}