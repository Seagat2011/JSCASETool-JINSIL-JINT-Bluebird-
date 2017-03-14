/*

TITLE: 
  JSOPERATOR.JS

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
            } 
            else 
            if (rhs[0][data].match(/\(/)) {
                localstack = this['('](me, i, localstack)
                rhs = peekSymbol(me, i + 1, 3)
            } 
            else 
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
            } 
            else 
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