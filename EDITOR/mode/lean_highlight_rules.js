/*

TITLE: 
  LEAN_HIGHLIGHT_RULES.JS

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
  highlighter rules for the LEAN syntax

INPUT:
  plain text

OUTPUT:
  html tag
  
SCRIPT TYPE: 
  pretty-text renderer

*/

function entag(tag,w){
    return ("<"+tag+w+"</"+tag)
}

function ace_variable(w){
    if(!(w.hasFE)){
        w.token = entag("ace_variable>",w.token)
    }
    return w
}

function ace_keyword(w){
    if(!(w.hasFE)){
        w.token = entag("ace_keyword>",w.token)
    }
    return w
}

function ace_operator(w){
    if(!(w.hasFE)){
        w.token = entag("ace_operator>",w.token)
    }
    return w
}

function ace_storage(w){
    if(!(w.hasFE)){
        w.token = entag("ace_storage>",w.token)
    }
    return w
}

function ace_constant(w){
    if(!(w.hasFE)){
        w.token = entag("ace_constant>",w.token)
    }
    return w
}

function ace_support(w){
    if(!(w.hasFE)){
        w.token = entag("ace_support>",w.token)
    }
    return w
}

function ace_name(w){
    if(!(w.hasFE)){
        w.token = entag("ace_name>",w.token)
    }
    return w
}

function ace_bool(w){
    if(!(w.hasFE)){
        w.token = entag("ace_bool>",w.token)
    }
    return w
}

function ace_tilde(w){
    if(!(w.hasFE)){
        w.token = entag("ace_tilde>",w.token)
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
        "/-":function(k){
            if(!(k.hasFE)){
                k.hasFE = k.token
                k.token = "<ace_comment>"+k.token
            }
            return k
            },
        "-/":function(k){
            if(k.hasFE=="/-"){
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
    // KEYWORD
    "add_rewrite":function(w){return ace_keyword(w)},
    "alias":function(w){return ace_keyword(w)},
    "as":function(w){return ace_keyword(w)},
    "assume":function(w){return ace_keyword(w)},
    "attribute":function(w){return ace_keyword(w)},
    "begin":function(w){return ace_keyword(w)},
    "by":function(w){return ace_keyword(w)},
    "calc":function(w){return ace_keyword(w)},
    "calc_refl":function(w){return ace_keyword(w)},
    "calc_subst":function(w){return ace_keyword(w)},
    "calc_trans":function(w){return ace_keyword(w)},
    "check":function(w){return ace_keyword(w)},
    "classes":function(w){return ace_keyword(w)},
    "coercions":function(w){return ace_keyword(w)},
    "conjecture":function(w){return ace_keyword(w)},
    "constants":function(w){return ace_keyword(w)},
    "context":function(w){return ace_keyword(w)},
    "corollary":function(w){return ace_keyword(w)},
    "else":function(w){return ace_keyword(w)},
    "end":function(w){return ace_keyword(w)},
    "environment":function(w){return ace_keyword(w)},
    "eval":function(w){return ace_keyword(w)},
    "example":function(w){return ace_keyword(w)},
    "exists":function(w){return ace_keyword(w)},
    "exit":function(w){return ace_keyword(w)},
    "export":function(w){return ace_keyword(w)},
    "exposing":function(w){return ace_keyword(w)},
    "extends":function(w){return ace_keyword(w)},
    "fields":function(w){return ace_keyword(w)},
    "find_decl":function(w){return ace_keyword(w)},
    "forall":function(w){return ace_keyword(w)},
    "from":function(w){return ace_keyword(w)},
    "fun":function(w){return ace_keyword(w)},
    "have":function(w){return ace_keyword(w)},
    "help":function(w){return ace_keyword(w)},
    "hiding":function(w){return ace_keyword(w)},
    "if":function(w){return ace_keyword(w)},
    "import":function(w){return ace_keyword(w)},
    "in":function(w){return ace_keyword(w)},
    "infix":function(w){return ace_keyword(w)},
    "infixl":function(w){return ace_keyword(w)},
    "infixr":function(w){return ace_keyword(w)},
    "instances":function(w){return ace_keyword(w)},
    "let":function(w){return ace_keyword(w)},
    "local":function(w){return ace_keyword(w)},
    "match":function(w){return ace_keyword(w)},
    "namespace":function(w){return ace_keyword(w)},
    "notation":function(w){return ace_keyword(w)},
    "obtain":function(w){return ace_keyword(w)},
    "obtains":function(w){return ace_keyword(w)},
    "omit":function(w){return ace_keyword(w)},
    "opaque":function(w){return ace_keyword(w)},
    "open":function(w){return ace_keyword(w)},
    "options":function(w){return ace_keyword(w)},
    "parameter":function(w){return ace_keyword(w)},
    "parameters":function(w){return ace_keyword(w)},
    "postfix":function(w){return ace_keyword(w)},
    "precedence":function(w){return ace_keyword(w)},
    "prefix":function(w){return ace_keyword(w)},
    "premise":function(w){return ace_keyword(w)},
    "premises":function(w){return ace_keyword(w)},
    "print":function(w){return ace_keyword(w)},
    "private":function(w){return ace_keyword(w)},
    "proof":function(w){return ace_keyword(w)},
    "protected":function(w){return ace_keyword(w)},
    "qed":function(w){return ace_keyword(w)},
    "raw":function(w){return ace_keyword(w)},
    "renaming":function(w){return ace_keyword(w)},
    "section":function(w){return ace_keyword(w)},
    "set_option":function(w){return ace_keyword(w)},
    "show":function(w){return ace_keyword(w)},
    "tactic_hint":function(w){return ace_keyword(w)},
    "take":function(w){return ace_keyword(w)},
    "then":function(w){return ace_keyword(w)},
    "universe":function(w){return ace_keyword(w)},
    "universes":function(w){return ace_keyword(w)},
    "using":function(w){return ace_keyword(w)},
    "variable":function(w){return ace_keyword(w)},
    "variables":function(w){return ace_keyword(w)},
    "with":function(w){return ace_keyword(w)},

    // NAME
    "inductive":function(w){return ace_name(w)},
    "structure":function(w){return ace_name(w)},
    "record":function(w){return ace_name(w)},
    "theorem":function(w){return ace_name(w)},
    "axiom":function(w){return ace_name(w)},
    "axioms":function(w){return ace_name(w)},
    "lemma":function(w){return ace_name(w)},
    "hypothesis":function(w){return ace_name(w)},
    "definition":function(w){return ace_name(w)},
    "constant":function(w){return ace_name(w)},

    // STORAGE
    "Prop":function(w){return ace_storage(w)},
    "Type":function(w){return ace_storage(w)},
    "Type'":function(w){return ace_storage(w)},
    "Type₊":function(w){return ace_storage(w)},
    "Type₁":function(w){return ace_storage(w)},
    "Type₂":function(w){return ace_storage(w)},
    "Type₃":function(w){return ace_storage(w)},

    // storageModifiers
    "abbreviations":function(w){return ace_storage(w)},
    "all-transparent":function(w){return ace_storage(w)},
    "begin-end-hints":function(w){return ace_storage(w)},
    "class":function(w){return ace_storage(w)},
    "classes":function(w){return ace_storage(w)},
    "coercion":function(w){return ace_storage(w)},

    "coercions":function(w){return ace_storage(w)},
    "declarations":function(w){return ace_storage(w)},
    "decls":function(w){return ace_storage(w)},
    "instance":function(w){return ace_storage(w)},
    "irreducible":function(w){return ace_storage(w)},

    "multiple-instances":function(w){return ace_storage(w)},
    "notation":function(w){return ace_storage(w)},
    "notations":function(w){return ace_storage(w)},
    "parsing-only":function(w){return ace_storage(w)},
    "persistent":function(w){return ace_storage(w)},

    "reduce-hints":function(w){return ace_storage(w)},
    "reducible":function(w){return ace_storage(w)},
    "tactic-hints":function(w){return ace_storage(w)},
    "visible":function(w){return ace_storage(w)},
    "wf":function(w){return ace_storage(w)},
    "whnf":function(w){return ace_storage(w)},

    // OPERATOR
    "#":function(w){return ace_operator(w)},
    "@":function(w){return ace_operator(w)},
    "->":function(w){return ace_operator(w)},
    "∼":function(w){return ace_operator(w)},
    "↔":function(w){return ace_operator(w)},
    "/":function(w){return ace_operator(w)},
    "==":function(w){return ace_operator(w)},
    "=":function(w){return ace_operator(w)},
    ":=":function(w){return ace_operator(w)},
    "<->":function(w){return ace_operator(w)},
    "/\\":function(w){return ace_operator(w)},
    "\\/":function(w){return ace_operator(w)},
    "∧":function(w){return ace_operator(w)},
    "∨":function(w){return ace_operator(w)},
    "≠":function(w){return ace_operator(w)},
    "<":function(w){return ace_operator(w)},
    ">":function(w){return ace_operator(w)},
    "≤":function(w){return ace_operator(w)},
    "≥":function(w){return ace_operator(w)},
    "¬":function(w){return ace_operator(w)},
    "<=":function(w){return ace_operator(w)},
    ">=":function(w){return ace_operator(w)},
    "⁻¹":function(w){return ace_operator(w)},
    "⬝":function(w){return ace_operator(w)},
    "▸":function(w){return ace_operator(w)},
    "+":function(w){return ace_operator(w)},
    "*":function(w){return ace_operator(w)},
    "-":function(w){return ace_operator(w)},
    "/":function(w){return ace_operator(w)},
    "λ":function(w){return ace_operator(w)},
    "→":function(w){return ace_operator(w)},
    "∃":function(w){return ace_operator(w)},
    "∀":function(w){return ace_operator(w)},
    ":=":function(w){return ace_operator(w)},
    "?":function(w){return ace_operator(w)},
    ":":function(w){return ace_operator(w)},
    ",":function(w){return ace_operator(w)},
    ";":function(w){return ace_operator(w)},
    ".":function(w){return ace_operator(w)},

    // NUMERIC
    "numeric":"(0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b)|([+-]?\\d+(\\.\\d*)?(([eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b)",

    // special-formatters
    "NnN":function(w){w.token = "<br>"; if(w.hasFE=='--'){w.hasFE=null;w.token = w.token+"</ace_comment>"}; return w},
    "SsS":function(w){w.token = "&nbsp;";return w},
    "'":function(w){return ace_single_quote(w)},
    '"':function(w){return ace_double_quote(w)},
    "`":function(w){return ace_tilde(w)},
    "/-":function(w){return ace_multiline_comment(w)},
    "-/":function(w){return ace_multiline_comment(w)},
    "--":function(w){return ace_line_comment(w)},
}