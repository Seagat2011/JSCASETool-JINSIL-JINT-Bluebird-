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

function loader() { // function loader ()
    //srcSnapShot.value = ''
    //srcStackTrace.value = ''
    srcTranslated.value = ''
    return
}
function clear_window() { // clear_window ()
    srcTranslated.value = ''
    return
}
function MD5() { // generate_MD5 ()
    srcTranslated.value = 
    'stacktrace - ' + 
    Math.md5(srcStackTrace.value) + 
    '\nsnapshot - ' + 
    Math.md5(srcSnapShot.value)
    return
}
Array.prototype.Repack = function() 
{
    var obj = []
    this.map(function(v, i, me) {
        if (v) {
            obj.push(v)
        }
        return v
    })
    return obj
}
Array.prototype.Filter = function() 
{
    var filter = arguments[0] || '.*' // accept any string as a Regular Expression (RE)
    var byStride = arguments[1] || 1
    var i = 0
    var obj = []
    this.map(function(v, i, me) {
        if (v && v.match(filter) && i++ % byStride) {
            obj.push(v)
        }
        return v
    })
    return obj
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
Object.prototype.dup = function(v, j) {
    var s = ''
    while (j--) {
        s += v
    }
    return s
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
        } else {
            var s = []
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
                }
                return u
            })
            selBoxModules.style.display = "none"
            selBoxModules.innerHTML = s.join('')
            selBoxModules.style.display = "block"
            divLibrary.value = intf.module.join('%%')
            refresh_module(selBoxModules.selectedIndex)
        }
    },
    "archive": {},
    "module": [],
} // intf {}
function refresh_module(u,force) {
    intf.module = divLibrary.value.split('%%')
    if ((selected.value != u) || force) {
        var _str_ = []
        var i = 0
        while (editor.getLine(i)) {
            _str_.push(editor.getLine(i++))
        }
        if (selected.value < intf.module.length){
            intf.module[selected.value] = _str_.join('\n')
        } else {
            intf.module.push(_str_.join('\n'))
        }
        editor.setValue(intf.module[u] || '')
        selected.value = u
        divLibrary.value = intf.module.join('%%')
    }
}
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
function peekNext(me, i, pttn, r) {
    var a = 1
    if (r) {
        while ((i in me) && a) {
            if (me[i] == pttn[0]) {
                a++
            } else 
            if (me[i] == pttn[1]) {
                a--
                if (!a) {
                    break
                }
            }
            i--
        }
    } else {
        while ((i in me) && a) {
            if (me[i] == pttn[0]) {
                a++
            } else 
            if (me[i] == pttn[1]) {
                a--
                if (!a) {
                    break
                }
            }
            i++
        }
    }
    return i
}
function peekSymbol(me, i, cnt, r) {
    var a = []
    if (r) {
        var u = 0
        while (u < cnt && (i in me)) {
            while ((i in me) && me[i].match(/^[\s\n]*$/)) {
                i--
            }
            if (me[i]) {
                a.push([me[i], i])
            }
            u++
            i--
        }
    } else {
        var u = 0
        while (u < cnt && (i in me)) {
            while ((i in me) && me[i].match(/^[\s\n]*$/)) {
                i++
            }
            if (me[i]) {
                a.push([me[i], i])
            }
            i++
            u++
        }
    }
    return a
}
function buildscope(JINT, me, i, localstack, ops) {
    var k = i + 1
    var hasOpenScope = {
        '[': '6B189E262D7D28EF1FBF946FDFF08716',
        '(': '152370721853AF95444F2F05AB29D4CC',
        '{': -1,
    }
    var K = peekNext(me, ++k, ops)
    while (k < K) {
        if (JINT[me[k]]) {
            localstack = JINT[me[k]](me, k, localstack)
        }
        k++
    }
    return localstack
}
var OPS = {
    isa: '<=',
    hasa: '=>',
    ffast: '=>=>',
}
var text_shift_F11 = {}
var Ada = {}
var Assembler = {}
var C_C_plusplus = {}
var C_sharp = {}
var CSS3 = {}
var D = {}
var Difference = {}
var Errorlist = {}
var Fortran = {}
var HTML_F12 = {}
var Java = {}
var Lisp = {}
var Lua = {}
var Matlab = {}
var Makefile_shift_Ctl_F11 = {}
var Pascal = {}
var Perl = {}
var PHP = {}
var Properties = {}
var Python = {}
var Ruby = {}
var Shell = {}
var SQL = {}
var TCL = {}
var TeX = {}
var VB = {}
var VBScript = {}
var Verilog = {}
var VHDL = {}
var XML_shift_F12 = {}
var JSoperator = {
    '<=': function(me, i, localstack) {
        var data = 0
        var index = 1
        var lhs = peekSymbol(me, i - 1, 3, 'rev')
        var rhs = peekSymbol(me, i + 1, 3)
        if (rhs[1] && rhs[1][data] == OPS.hasa) {
            var row = localstack.length - 1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data]
            if (this['6B189E262D7D28EF1FBF946FDFF08716'].length == 1) {
                w
            }
            if (localstack[row][row_lhs] == '') {
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w, ''])
            }
        } else {
            if (rhs[0][data].match(/\{/)) {
                localstack = this['{'](me, i, localstack)
                rhs = peekSymbol(me, i + 1, 3)
            } else 
            if (rhs[0][data].match(/\(/)) {
                localstack = this['('](me, i, localstack)
                rhs = peekSymbol(me, i + 1, 3)
            } else 
            if (rhs[0][data].match(/\[/)) {
                localstack = this['['](me, i, localstack)
                rhs = peekSymbol(me, i + 1, 3)
            }
            var row = localstack.length - 1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data]
            var v = rhs[0][data]
            if (localstack[row][row_lhs] == '') {
                localstack[row][row_lhs] += w
                if (!rhs[1] || (rhs[1] && rhs[1][data] != OPS.hasa)) {
                    localstack[row][row_rhs] += v
                }
            } else {
                localstack.push([w, v])
            }
            if (lhs[2] && lhs[1] && lhs[1][data] == OPS.isa) {
                localstack.push([lhs[2][data], w])
                me[i] = ''
                me[rhs[0][index]] = ''
            } else 
            if (this['6B189E262D7D28EF1FBF946FDFF08716'].length == 1 && rhs[1][data] == ']') {
                me[i] = ''
                me[lhs[0][index]] = ''
                me[rhs[0][index]] = '[' + lhs[1][data] + ']'
                me[rhs[1][index]] = ''
                me[lhs[1][index]] = ''
                me[lhs[2][index]] = ''
                this['6B189E262D7D28EF1FBF946FDFF08716'].pop()
            } else {
                me[i] = '='
            }
        }
        
        return localstack
    },
    '=>': function(me, i, localstack) {
        var HASACompiledScope = false
        var data = 0
        var index = 1
        var lhs = peekSymbol(me, i - 1, 3, 'rev')
        var rhs = peekSymbol(me, i + 1, 3)
        if (rhs[0][data].match(/\{/)) {
            localstack = this['{'](me, i, localstack)
            rhs = peekSymbol(me, i + 1, 3)
        } else 
        if (rhs[0][data].match(/\(/)) {
            localstack = this['('](me, i, localstack)
            rhs = peekSymbol(me, i + 1, 3)
        } else 
        if (rhs[0][data].match(/\[/)) {
            localstack = this['['](me, i, localstack)
            rhs = peekSymbol(me, i + 1, 3)
            HASACompiledScope = true
        }
        var row = localstack.length - 1
        var row_lhs = 0
        var row_rhs = 1
        var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm, '')
        var v = ''
        if (HASACompiledScope && !this["6B189E262D7D28EF1FBF946FDFF08716"].length) {
            v = rhs[0][data]
        } else {
            var lbrack = '["'
            var rbrack = '"]'
            if (this["6B189E262D7D28EF1FBF946FDFF08716"].length) {
                lbrack = lbrack.replace(/\"/, '')
                rbrack = rbrack.replace(/\"/, '')
            }
            v = lbrack + rhs[0][data].replace(/\W+/gm, '') + rbrack
        }
        me[i] = ''
        me[lhs[0][index]] = ''
        var u = w + v
        if (HASACompiledScope && !this["6B189E262D7D28EF1FBF946FDFF08716"].length) {
            if (localstack[row][row_rhs] == '') {
                localstack[row][row_rhs] += u
            } else {
                localstack.push(['', u])
            }
        } else {
            if (localstack[row][row_rhs] == '') {
                localstack[row][row_rhs] += u
            } else {
                localstack[row][row_rhs] += v
            }
        }
        if (
        (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data] == OPS.isa) && 
        (!rhs[1] || (rhs[1] && rhs[1][data] && rhs[1][data] != OPS.hasa && rhs[1][data] != OPS.isa))
        ) {
            me[lhs[1][index]] = ''
            me[rhs[0][index]] = ''
        } else 
        if (
        (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data] == OPS.isa) && 
        (rhs[1] && rhs[1][data] && rhs[1][data] == OPS.isa)
        ) {
            localstack.push([u, rhs[2][data]])
            me[lhs[1][index]] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = ''
            var next = peekSymbol(me, rhs[2][index] + 1, 2)
            if (!next[0] || (next[0] && next[0][data] != OPS.hasa && next[0][data] != OPS.isa)) {
                me[rhs[2][index]] = ''
                localstack.push([rhs[2][data], '__local__'])
            }
        } else {
            me[rhs[0][index]] = u
        }
        return localstack
    
    },
    '[': function(me, i, localstack) {
        var data = 0
        var index = 1
        var lhs = peekSymbol(me, i - 1, 3, 'rev')
        var rhs = peekSymbol(me, i + 1, 3)
        if (
        ((rhs[2][data] == ']'))
        ) {
            var row = localstack.length - 1
            var row_lhs = 0
            var row_rhs = 1
            var w = '[' + rhs[1][data].replace(/[^\[\]\w+\d+\"\']+/gm, '') + ']'
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
            me[rhs[2][index]] = ''
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
            localstack = buildscope(this, me, i, localstack, '[]')
        }
        return localstack
    },
    ']': function(me, i, localstack) {
        if (this["6B189E262D7D28EF1FBF946FDFF08716"].length) {
            this["6B189E262D7D28EF1FBF946FDFF08716"].pop()
        }
        return localstack
    },
    '(': function(me, i, localstack) {
        var data = 0
        var index = 1
        var lhs = peekSymbol(me, i - 1, 3, 'rev')
        var rhs = peekSymbol(me, i + 1, 3)
        if ((rhs[1][data] == ')')) {
            var row = localstack.length - 1
            var row_lhs = 0
            var row_rhs = 1
            var w = 'function ()'
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("152370721853AF95444F2F05AB29D4CC", i) // lparen //
            /*
            var I = peekNext(me,i,')')
            var metoo = me.slice(i,I)
            */
            localstack = buildscope(this, me, i, localstack, '()')
        }
        return localstack
    },
    ')': function(me, i, localstack) {
        if (this["152370721853AF95444F2F05AB29D4CC"].length) {
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
    "7714F8C839428D0E184EAF11464D3A6E": [['', '']], // md5(operationstack) //
    "6B189E262D7D28EF1FBF946FDFF08716": [], // md5(lbrack) //
    "B89B9AC07070CF76C97B285EC04D982C": [], // md5(rbrack) //
    "152370721853AF95444F2F05AB29D4CC": [], // md5(lparen) //
    "EC9962F64DBBC61B566D4D3478A4902A": [], // md5(rparen) //
    "B6D00DC1BA038E5901CD6C06B2DAA192": [], // md5(comma) //
    "9ACC23D8765224A84121BC737E6C1836": [], // md5(ffast) //
    "165A1761634DB1E9BD304EA6F3FFCF2B": [], // md5(isa) //
    "B2FAE65A017B97031EFB1C6DB2AE3658": function(v, i) { // md5(addtostack) //
        this[v].unshift(i)
    },
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
function bbtojs(a) {
    var bbglobals = 1
    var bblocals = 2
    var operator
    if (sourceLibrary[selBoxToSource.selectedIndex]) {
        operator = sourceLibrary[selBoxToSource.selectedIndex]()
    } else {
        operator = sourceLibrary['default']()
    }
    a[0].map(function(u, i, me) {
        if (operator[u]) {
            a[bblocals] = operator[u](me, i, a[bblocals])
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
    var fe = '  '
    var minor_tab = this.dup(fe, 1)
    var major_tab = this.dup(fe, 2)
    var entity = []
    var buffer = intf[0]()
    var archive = {}
    var callstack = []
    refresh_module(selBoxModules.selectedIndex,'force')
    var bbmodules = [XFE] //divLibrary.value.split('%%')
    var bbglobals = [['', ''], ]
    bbmodules.map(function(u) {
        var bblocals = [['', ''], ]
        /*
        u = u
            .replace(/(\n)/gm,'/n')
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            .split(/\s+/)
        */
        return bbtojs([u, null, bblocals])
    })
    buffer.map(function(n) {
        var idx = n.match(/\s/g) || {length: 0}
        var indent = idx.length
        var w = n.replace(/\s+/g, '')
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
        return n
    })
    // map(buffer) //
    var cstart = [] //['/** JBLAST - AUTO GENERATED CODE **/\n\n']
    entity.map(function(w) {
        var s = buildproc(w)
        if (s) {
            cstart.push(s + '\n')
        }
        return w
    })
    //cstart.push('\n/************* JBLAST *************/')
    result_editor.setValue(cstart.join('\n'))
}
function g_switch() {
    try {
        var result = arguments[0][arguments[1]]
    } catch (e) {
        var result = arguments[0]['default']
    }
    return result
}
function translatorTool() {
    g_switch(intf, "__main")(srcStackTrace.value)
}
var XFE = [ /* TODO: sample inputs for generate_module() => bbmodules[] */
/*
"entity",
"=>",
"[",
"gpi",
"<=",
"_",
"=>",
"godparent",
"=>",
"indent",
"<=",
"callstack",
"=>",
"[",
"0",
"]",
"=>",
"indent",
"<=",
"indent",
"]",
*/
    "[", 
    "gpi", 
    "<=", 
    "_", 
    "=>", 
    "godparent", 
    "=>", 
    "indent", 
    "<=", 
    "callstack", 
    "=>", 
    "[", 
    "0", 
    "]", 
    "=>", 
    "indent", 
    "<=", 
    "indent", 
    "]", 
    "<=", 
    "entity", 
/*
"__",
"<=",
"entity",
"=>",
"godparent",
"=>",
"indent",
"<=",
"indent",
/*
"[",
"__",
"]",
"<=",
"entity",
/*
"__",
"=>",
"[",
"gpi",
"]",
"=>",
"[",
"gpl",
"]",
"=>",
"[",
"gpc",
"]",
"=>",
"unshift",
/*
"entity",
"=>",
"gpi",
"<=",
"gpi",
/*
"__",
"<=",
"entity",
"=>",
"gpi",
"<=",
"gpi",
/*
"__",
"<=",
"entity",
"=>",
"gpi",
/*
"entity",
"=>",
"godparent",
"=>",
"indent",
"<=",
"indent",
/*
"__",
"<=", 
"entity",
/*
'entity',
'=>',
'godparent',
'=>',
'indent',
/*
"entity",
"=>",
"gpi",
/*
 "",
 "(",
 "indent<1",
 ")",
 "{/n",
 "callstack",
 "=",
 "updatecallstack",
 "(",
 "_",
 "",
 "",
 "",
 "",
 ",",
 "callstack",
 ",",
 "indent",
 ")",
 "/n}/n",
 "(",
 "indent<2",
 ")",
 "{/n",
 "(",
 "last!=indent",
 "",
 "",
 ")",
 "{/n",
 "callstack",
 "<=",
 "updatecallstack",
 "(",
 "_",
 ",",
 "callstack",
 ",",
 "indent",
 ")",
 "/n",
 "__",
 "<=",
 "(",
 "entity",
 ")",
 "=>",
 "[",
 "gpi",
 "<=",
 "_",
 "=>",
 "godparent",
 "=>",
 "indent",
 "<=",
 "callstack",
 "=>",
 "[",
 "0",
 "]",
 "=>",
 "indent",
 "]",
 "=>",
 "[",
 "gpl",
 "<=",
 "_",
 "=>",
 "godparent",
 "=>",
 "level",
 "<=",
 "callstack",
 "=>",
 "[",
 "0",
 "]",
 "=>",
 "level",
 "]",
 "=>",
 "[",
 "gpc",
 "<=",
 "_",
 "=>",
 "godparent",
 "=>",
 "codebody",
 "<=",
 "5",
 "]",
 "=>",
 "push",
 "(",
 "[",
 "minor_tab+'this",
 "[",
 "\"'",
 ",",
 "w",
 ",",
 "'\"",
 "]",
 "=>",
 "(",
 "'",
 ",",
 "[",
 "]",
 ",",
 "'",
 ")",
 "{\\n'",
 ",",
 "[",
 "]",
 ",",
 "'\\n'+minor_tab+'}\\n'",
 "]",
 ")",
 "/n",
 "}/n",
 "__",
 "=>",
 "[",
 "indent",
 "]",
 "=>",
 "push",
 "(",
 "[",
 "_",
 "=>",
 "parent",
 "=>",
 "s_name",
 "<=",
 "callstack",
 "=>",
 "[",
 "0",
 "]",
 "=>",
 "s_name",
 "+",
 "'.'",
 ",",
 "w",
 ",",
 "'",
 "(",
 "'",
 ",",
 "[",
 "]",
 ",",
 "'",
 ")",
 "'",
 ",",
 "'\\n'",
 "]",
 ")",
 "/n}",
 "/n",
 "(",
 "indent",
 ")",
 "{/n",
 "(",
 "last!=",
 "<=",
 "indent",
 ")",
 "{/n",
 "callstack",
 "<=",
 "updatecallstack",
 "(",
 "_",
 ",",
 "callstack",
 ",",
 "indent",
 ")",
 "/n",
 "__",
 "=>",
 "[",
 "gpi",
 "]",
 "=>",
 "[",
 "gpl",
 "]",
 "=>",
 "[",
 "gpc",
 "]",
 "=>",
 "unshift",
 "(",
 "[",
 "minor_tab+'this",
 "[",
 "\"'",
 ",",
 "w",
 ",",
 "'\"",
 "]",
 "=>",
 "(",
 "'",
 ",",
 "[",
 "]",
 ",",
 "'",
 ")",
 "{\\n'",
 ",",
 "[",
 "]",
 ",",
 "'\\n'+minor_tab+'}\\n'",
 "]",
 ")",
 "/n",
 "}/n",
 "__",
 "=>",
 "[",
 "gpi",
 "]",
 "=>",
 "[",
 "gpl",
 "]",
 "<=",
 "set_gparent_codebody",
 "(",
 "_",
 ",",
 "__",
 "=>",
 "[",
 "gpi",
 "]",
 "=>",
 "[",
 "gpl",
 "]",
 ",",
 "w",
 ",",
 "[",
 "major_tab+'this.'",
 ",",
 "w",
 ",",
 "'",
 "(",
 "'",
 ",",
 "[",
 "]",
 ",",
 "'",
 ")",
 "'",
 ",",
 "'\\n'",
 "]",
 ",",
 "indent",
 ")",
 "/n}"
*/
]
