/*

TITLE:
  EDITOR.JS

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
  editor shell

INPUT:
  _

OUTPUT:
  _

*/

function Editor()
{
  var self = this;
  this.cache = {};
  this.refno = 0;
  this.reModule = "\\/\\/.*\.[Jj][Ss]";
  this.reGlobalAttribute = "^ga_";
  this.reGlobal = "^g_";
  this.reAttribute = "^a_";
  this.reProperty = "\\(.*\\)";
  this.reGraph = "\\/\\/\\s*[Gg]raph ";
  this.isProperty = function(u)
  {
    var re = new RegExp(self.reProperty,"");
    return (u.match(re) && true);
  }
  this.isAttribute = function(u)
  {
    var re = new RegExp(self.reProperty,"");
    return (!u.match(re) && true);
  }
  this.op = {};
  this.op[self.reModule] = function(u){
    return u.asModuleTag();
  };
  this.op[self.reGlobalAttribute] = function(u){
    if(self.isAttribute(u)){
      u = u.asAttributeTag().asGlobalTag();
    }
    return u;
  };
  this.op[self.reGlobal] = function(u){
    if(self.isProperty(u)){
      u = u.asGlobalTag();
    }
    return u
  };
  this.op[self.reAttribute] = function(u){
    if(self.isAttribute(u)){
      u = u.asAttributeTag();
    }
    return u;
  };
  this.op[self.reProperty] = function(u){
    return u.asPropertyTag();
  };
  this.op[self.reGraph] = function(u){
    return u.asGraphTag();
  };
  this.op.invalidateObjProperties();
  this.onEditorKey = {
    "Enter":function(e){
      var code = ["<div>"];
      var srcCode = self.srcCode;
      var srcCodeTxt = self.srcCodeTxt;
      code.push(srcCodeTxt.value.split(/\n/g).map(
      function(line,i)
      {
        var entryNotFound = (!(i in self.cache) || ((i in self.cache) && (line != self.cache[i].txt)));
        if(entryNotFound)
        {
          self.cache[i] = { txt:line, src:"" };
          var matchFound;
          self.op.forEach(
          function(prop)
          {
            var re = new RegExp(prop,"");
            if(!matchFound && line.match(re))
            {
              matchFound = true;
              line = self.op[prop](line);
            }
            return prop;
          });
          self.cache[i].src = line;
        }
        else
        {
          line = self.cache[i].src;
        }
        return line;
      }).join("<br>").replace(/\s/g,"&nbsp;"),"");
      srcCode.innerHTML = code.join("");
    },
    "default":function(id,e){
    },
  }
  this.create = function(){
    var I = arguments.length;
    for(var i=0;i<I;i++){
      var id = arguments[i];
      if(id != null){
        var blaze = document.getElementById(id);
        blaze.innerHTML = "<div class='cssSrc' id='srcCode"+self.refno+"'></div><textarea class='cssSrcTxt' id='srcCodeTxt"+self.refno+"'></textarea>";
        var Txt = document.getElementById("srcCodeTxt"+self.refno);
        var Src = document.getElementById("srcCode"+self.refno);
        Src.style.top = blaze.offsetTop;
        Src.style.left = blaze.offsetLeft;
        Txt.style.top = blaze.offsetTop;
        Txt.style.left = blaze.offsetLeft;
        Txt.editor = new Editor();
        Txt.editor.srcCode = Src;
        Txt.editor.srcCodeTxt = Txt;
        Txt.spellcheck = false;
        Src.spellcheck = false;
        Txt.addEventListener("keyup",
        function(e)
        {
          if(e.target.id == this.id)
          {
            this.editor.onEditorKey["Enter"](e);
          }
        },false);
        Txt.addEventListener("scroll",
        function(e)
        {
          if(e.target.id == this.id)
          {
            this.editor.srcCode.scrollTop = this.scrollTop;
          }
        }, false);
        self.refno++;
      }
    }
  }
}
var editor = new Editor();
