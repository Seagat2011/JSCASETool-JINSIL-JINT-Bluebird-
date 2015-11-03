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

var instanceHANDLE = 0
var voidkeycode = {
    16: 1,
    17: 1,
    18: 1,
    20: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    45: 1,
    225: 1,
}
function setText(o,w) {
    if('innerText' in o) {
        o.innerText = w
    } else {
        o.innerHTML = w.replace(/\n/gm,'<br>')
    }
}
function getText(o) {
    var ret
    if('innerText' in o) {
        ret = o.innerText
    } else {
        ret = o.innerHTML
            .replace(/<\s*\\?\s*br\s*>/gmi,'\n')
            .replace(/<\s*\\?\s*.+\s*>/gmi,'')
    }
    return ret
}
function newline(o) {
    var ret
    if('innerText' in o) {
        ret = '\n'
    } else {
        ret = '<br>'
    }
    return ret
}
function _rows(obj) {
    var de = obj.de
    var te = obj.te
    var __rows__ = obj.vrows
    this.rows = []
    this.fontsize = 9
    this.lastResizeNum
    this.resize = function(startIDX, ht) {
        this.rows = []
        startIDX = startIDX || 0
        ht = Math.max(ht || 0, te.clientHeight, te.scrollHeight)
        if (ht != this.lastResizeNum || !this.lastResizeNum) {
            var B = parseInt((ht / this.fontsize) * 0.62)
            /* 12pt:0.80; 13pt:0.75; 9pt:0.65; 10pt:0.62 */
            for (var b = startIDX; b < B; b++) {
                this.rows.push(b + 1)
            }
            setText(__rows__,this.rows.join(newline(__rows__)))
            this.lastResizeNum = ht
        }
    }
    this.resize()
}
_rows.prototype = {} 
function _editor(obj) {
    var de = obj.de
    var te = obj.te
    var __rows__ = obj.vrows
    this.toTEXTBUFFER
    this.getLines = function() {
        return getText(te).split(/\n/gm)
    }
    this.setLine = function(i,w) {
        var status = 'default-replace-all'
        var ret = getText(te).split(/\n/gm)
        if (i in ret) {
            status = true
            ret[i] = w
            setText(te,ret.join(newline(__rows__)))
            this.highlight_keywords(getText(te), de)
        } else {
            if(!w) {
                w = i
            }
            setText(te,w)
            this.highlight_keywords(getText(te), de)
        }
        return status
    }
    this.setMODE = function() {
    
    }
    this.setTHEME = function() {
    
    }
    this.highlight_keywords = function() {
        var txt = getText(te)
        if (this.toTEXTBUFFER != txt) {
            this.toTEXTBUFFER = txt
            var s = txt
            .replace(/\n/gm, '%#%NnN%#%')
            .replace(/\s/gm, ' SsS ')
            .replace(/([\W]+)/gm, ' $1 ')
            .replace(/('|"|`)/gm, ' $1 ')
            .replace(/(%#%)+/gm, ' ')
            .split(/\s+/)
            var _s = s
            /* var keywordMapper = */// external declaration //
            var fe = {
                token: "",
                hasFE: null ,
            }
            var toHTML = s.map(function(w, i, me) {
                fe.token = w
                if (keywordMapper.hasOwnProperty(w)) {
                    fe = keywordMapper[w](fe)
                } else 
                if (w.match(keywordMapper["numeric"]) && !(fe.hasFE)) {
                    fe.token = "<ace_numeric>" + w + "</ace_numeric>"
                }
                return fe.token
            }
            )
            de.innerHTML = toHTML.join('')
        }
    }
}
_editor.prototype = {} 
function __BLACK_SPADE_EDITOR__ () {
    this.fromTextarea = function(_id_) {
        var id = null
        var vrows = "__rows__"+instanceHANDLE
        var texteditor = "te"+instanceHANDLE
        var diveditor = "de"+instanceHANDLE
        var ihandle = instanceHANDLE++
        var obj = document.getElementById(_id_)
        if(obj) {
            obj.outerHTML = 
                "<div class=code-container id=__container__"+ihandle+">\n" +
                "<div class=v-rows id=__rows__"+ihandle+"></div>\n" +
                "<div class=code-editor id=__editor__"+ihandle+">\n" +
                "<div class=code-window id=te"+ihandle+" spellcheck='false' autocapitalize='off' autocorrect='off' contenteditable='true' style='\n" +
                "   -webkit-text-fill-color:rgba(0,0,0,0);\n" + 
                "    color:rgba(0,0,0,0.2);\n" +
                "    background:rgba(0,0,0,0); z-index:1;\n" +
                "    border:1px solid gray;'></div>\n" +
                "<div class=code-window id=de"+ihandle+" spellcheck='false' autocapitalize='off' autocorrect='off'></div>\n" +
                "</div>\n" +
                "</div>"
            obj.te = document.getElementById(texteditor)
            obj.de = document.getElementById(diveditor)
            obj.vrows = document.getElementById(vrows)
            obj.editor = new _editor(obj)
            obj.editor_rows = new _rows(obj)
            obj.te.addEventListener('keyup', function(e) {
                if (id>-1) {
                    delete id
                    obj.editor.highlight_keywords()
                }
            }
            , false)
            obj.te.addEventListener('keydown', function(e) {
                if (!voidkeycode[e.keycode] && !voidkeycode[e.keyCode]) {
                    id = ihandle
                }
                obj.de.scrollTop = obj.te.scrollTop
                obj.de.scrollLeft = obj.te.scrollLeft
                obj.editor_rows.resize()
            }
            , false)
            obj.te.addEventListener('scroll', function(e) {
                obj.de.scrollTop = e.target.scrollTop
                obj.de.scrollLeft = e.target.scrollLeft
                obj.vrows.scrollTop = obj.te.scrollTop
                obj.vrows.scrollLeft = obj.te.scrollLeft
            }
            , false)
            return obj.editor
        } else {
            console.log("*** Warning *** -- failed to create black spade editor " + _id_)
            return _id_
        }
        return obj
    }
}
__BLACK_SPADE_EDITOR__.prototype = {}
BLACK_SPADE_EDITOR = new __BLACK_SPADE_EDITOR__ ()

