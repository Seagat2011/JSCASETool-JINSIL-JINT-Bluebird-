/*

TITLE: 
  MAIN.JS

AUTHOR: Seagat2011 
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  N/A

DESCRIPTION: 
  JINSIL / JINT BLACK SPADE - (sourcecode editor for JINSIL / JINT BLUE)

INPUT:
  plain text

OUTPUT:
  pretty-text
  
SCRIPT TYPE: 
  pretty-text renderer

*/

function entag(tag,w){
    return ("<"+tag+">"+w+"</"+tag+">")
}

function ace_variable(w){
    if(!(w.hasFE)){
        w.token = entag("ace_variable",w.token)
    }
    return w
}

function ace_keyword(w){
    if(!(w.hasFE)){
        w.token = entag("ace_keyword",w.token)
    }
    return w
}

function ace_operator(w){
    if(!(w.hasFE)){
        w.token = entag("ace_operator",w.token)
    }
    return w
}

function ace_storage(w){
    if(!(w.hasFE)){
        w.token = entag("ace_storage",w.token)
    }
    return w
}

function ace_constant(w){
    if(!(w.hasFE)){
        w.token = entag("ace_constant",w.token)
    }
    return w
}

function ace_support(w){
    if(!(w.hasFE)){
        w.token = entag("ace_support",w.token)
    }
    return w
}

function ace_bool(w){
    if(!(w.hasFE)){
        w.token = entag("ace_bool",w.token)
    }
    return w
}

function ace_tilde(w){
    if(!(w.hasFE)){
        w.token = entag("ace_tilde",w.token)
    }
    return w
}

// SPECIAL-CASE TAGS WHICH DO NOT INVOKE ENTAG ..

function ace_single_quote(w){
    if(!(w.hasFE)){
        w.hasFE = w.token
        w.token = ("<ace_string>"+w.token)
    } else
    if(w.hasFE==w.token){
        w.hasFE = null
        w.token = (w.token+"</ace_string>")
    }
    return w
}

function ace_double_quote(w){
    if(!(w.hasFE)){
        w.hasFE = w.token
        w.token = ("<ace_string>"+w.token)
    } else
    if(w.hasFE==w.token){
        w.hasFE = null
        w.token = (w.token+"</ace_string>")
    }
    return w
}

function ace_multiline_comment(w){
    var line_status = {
        "/*":function(k){
            if(!(k.hasFE)){
                k.hasFE = k.token
                k.token = "<ace_comment>"+k.token
            }
            return k
            },
        "*/":function(k){
            if(k.hasFE=="/*"){
                k.hasFE = null
                k.token = k.token+"</ace_comment>"
            }
            return k
            },
    }
    return line_status[w.token](w)
}

function ace_line_comment(w){
    if(!(w.hasFE)){
        w.hasFE = w.token
        w.token = ("<ace_comment>"+w.token)
    }
    return w
}

// KEYWORDS ..

var keywordMapper = {
    // variable.language
    "Array":function(w){return ace_variable(w)},
    "Boolean":function(w){return ace_variable(w)},
    "Date":function(w){return ace_variable(w)},
    "Function":function(w){return ace_variable(w)},
    "Iterator":function(w){return ace_variable(w)},
    "Number":function(w){return ace_variable(w)},
    "Object":function(w){return ace_variable(w)},
    "RegExp":function(w){return ace_variable(w)},
    "String":function(w){return ace_variable(w)},
    "Proxy":function(w){return ace_variable(w)},
    "Namespace":function(w){return ace_variable(w)},
    "QName":function(w){return ace_variable(w)},
    "XML":function(w){return ace_variable(w)},
    "XMLList":function(w){return ace_variable(w)},
    "ArrayBuffer":function(w){return ace_variable(w)},
    "Float32Array":function(w){return ace_variable(w)},
    "Float64Array":function(w){return ace_variable(w)},
    "Int16Array":function(w){return ace_variable(w)},
    "Int32Array":function(w){return ace_variable(w)},
    "Int8Array":function(w){return ace_variable(w)},
    "Uint16Array":function(w){return ace_variable(w)},
    "Uint32Array":function(w){return ace_variable(w)},
    "Uint8Array":function(w){return ace_variable(w)},
    "Uint8ClampedArray":function(w){return ace_variable(w)},
    "Error":function(w){return ace_variable(w)},
    "EvalError":function(w){return ace_variable(w)},
    "InternalError":function(w){return ace_variable(w)},
    "RangeError":function(w){return ace_variable(w)},
    "ReferenceError":function(w){return ace_variable(w)},
    "StopIteration":function(w){return ace_variable(w)},
    "SyntaxError":function(w){return ace_variable(w)},
    "TypeError":function(w){return ace_variable(w)},
    "URIError":function(w){return ace_variable(w)},
    "decodeURI":function(w){return ace_variable(w)},
    "decodeURIComponent":function(w){return ace_variable(w)},
    "encodeURI":function(w){return ace_variable(w)},
    "encodeURIComponent":function(w){return ace_variable(w)},
    "eval":function(w){return ace_variable(w)},
    "isFinite":function(w){return ace_variable(w)},
    "isNaN":function(w){return ace_variable(w)},
    "parseFloat":function(w){return ace_variable(w)},
    "parseInt":function(w){return ace_variable(w)},
    "JSON":function(w){return ace_variable(w)},
    "Math":function(w){return ace_variable(w)},
    "this":function(w){return ace_variable(w)},
    "arguments":function(w){return ace_variable(w)},
    "prototype":function(w){return ace_variable(w)},
    "window":function(w){return ace_variable(w)},
    "document":function(w){return ace_variable(w)},
    
    // keyword
    "const":function(w){return ace_keyword(w)},
    "yield":function(w){return ace_keyword(w)},
    "import":function(w){return ace_keyword(w)},
    "get":function(w){return ace_keyword(w)},
    "set":function(w){return ace_keyword(w)},
    "break":function(w){return ace_keyword(w)},
    "case":function(w){return ace_keyword(w)},
    "catch":function(w){return ace_keyword(w)},
    "continue":function(w){return ace_keyword(w)},
    "default":function(w){return ace_keyword(w)},
    "delete":function(w){return ace_keyword(w)},
    "do":function(w){return ace_keyword(w)},
    "else":function(w){return ace_keyword(w)},
    "finally":function(w){return ace_keyword(w)},
    "for":function(w){return ace_keyword(w)},
    "function":function(w){return ace_keyword(w)},
    "if":function(w){return ace_keyword(w)},
    "in":function(w){return ace_keyword(w)},
    "instanceof":function(w){return ace_keyword(w)},
    "new":function(w){return ace_keyword(w)},
    "return":function(w){return ace_keyword(w)},
    "switch":function(w){return ace_keyword(w)},
    "throw":function(w){return ace_keyword(w)},
    "try":function(w){return ace_keyword(w)},
    "typeof":function(w){return ace_keyword(w)},
    "let":function(w){return ace_keyword(w)},
    "var":function(w){return ace_keyword(w)},
    "while":function(w){return ace_keyword(w)},
    "with":function(w){return ace_keyword(w)},
    "debugger":function(w){return ace_keyword(w)},
    "__parent__":function(w){return ace_keyword(w)},
    "__count__":function(w){return ace_keyword(w)},
    "escape":function(w){return ace_keyword(w)},
    "unescape":function(w){return ace_keyword(w)},
    "with":function(w){return ace_keyword(w)},
    "__proto__":function(w){return ace_keyword(w)},
    "prototype":function(w){return ace_keyword(w)},
    "class":function(w){return ace_keyword(w)},
    "enum":function(w){return ace_keyword(w)},
    "extends":function(w){return ace_keyword(w)},
    "super":function(w){return ace_keyword(w)},
    "export":function(w){return ace_keyword(w)},
    "implements":function(w){return ace_keyword(w)},
    "private":function(w){return ace_keyword(w)},
    "public":function(w){return ace_keyword(w)},
    "interface":function(w){return ace_keyword(w)},
    "package":function(w){return ace_keyword(w)},
    "protected":function(w){return ace_keyword(w)},
    "static":function(w){return ace_keyword(w)},

    // storage.type
    "const":function(w){return ace_storage(w)},
    //"let":function(w){return ace_storage(w)},
    //"var":function(w){return ace_storage(w)},
    //"function":function(w){return ace_storage(w)},

    // constant.language
    "null":function(w){return ace_constant(w)},
    "Infinity":function(w){return ace_constant(w)},
    "NaN":function(w){return ace_constant(w)},
    "undefined":function(w){return ace_constant(w)},

    // support.function
    "alert":function(w){return ace_support(w)},
    
    // operator
    "~":function(w){return ace_operator(w)},
    "%":function(w){return ace_operator(w)},
    ":":function(w){return ace_operator(w)},
    "^":function(w){return ace_operator(w)},
    "&&":function(w){return ace_operator(w)},
    "&":function(w){return ace_operator(w)},
    "*":function(w){return ace_operator(w)},
    "?":function(w){return ace_operator(w)},
    "!":function(w){return ace_operator(w)},
    "+":function(w){return ace_operator(w)},
    "<<=":function(w){return ace_operator(w)},
    ">>=":function(w){return ace_operator(w)},
    ">>>=":function(w){return ace_operator(w)},
    ">>":function(w){return ace_operator(w)},
    "<<":function(w){return ace_operator(w)},
    ">>>":function(w){return ace_operator(w)},
    "=":function(w){return ace_operator(w)},
    "==":function(w){return ace_operator(w)},
    "===":function(w){return ace_operator(w)},
    "<=":function(w){return ace_operator(w)},
    ">=":function(w){return ace_operator(w)},
    "!=":function(w){return ace_operator(w)},
    "<":function(w){return ace_operator(w)},
    ">":function(w){return ace_operator(w)},
    "|":function(w){return ace_operator(w)},
    "=":function(w){return ace_operator(w)},
    "*=":function(w){return ace_operator(w)},
    "=":function(w){return ace_operator(w)},
    "&=":function(w){return ace_operator(w)},
    "+=":function(w){return ace_operator(w)},
    "-=":function(w){return ace_operator(w)},
    "^=":function(w){return ace_operator(w)},
    "/=":function(w){return ace_operator(w)},
    "++":function(w){return ace_operator(w)},
    "--":function(w){return ace_operator(w)},
    "-":function(w){return ace_operator(w)},
    "||":function(w){return ace_operator(w)},
    
    // constant.language.boolean
    "true":function(w){return ace_bool(w)},
    "false":function(w){return ace_bool(w)},
    
    // RegExp
    "numeric":"^(0[xX][0-9a-fA-F]+|-?\\d+((\\.\\d*)?([eE\\^][\\+\\-]?\\d+)?)?)$",
    "multiline.comment.open":"^(\\/\\*.*)$",
    "multiline.comment.close":"^(.*\\*\\/)$",
    "line.comment":"^(\\/\\/.*)$",
    "newline":"NnN",
    
    // special-formatters
    "NnN":function(w){w.token = "<br>"; if(w.hasFE=='//'){w.hasFE=null;w.token = w.token+"</ace_comment>"}; return w},
    "SsS":function(w){w.token = "&nbsp;";return w},
    "'":function(w){return ace_single_quote(w)},
    '"':function(w){return ace_double_quote(w)},
    "`":function(w){return ace_tilde(w)},
    "/*":function(w){return ace_multiline_comment(w)},
    "*/":function(w){return ace_multiline_comment(w)},
    "//":function(w){return ace_line_comment(w)},
}
