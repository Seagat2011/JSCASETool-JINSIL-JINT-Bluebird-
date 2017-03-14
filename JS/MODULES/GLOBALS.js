/*

TITLE: 
  GLOBALS.JS

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
  MODULE globals

*/

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
// TODO : define these in their own files in MODULES folder
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