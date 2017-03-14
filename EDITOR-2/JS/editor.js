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

function RefObj(i,s)
{
  this.refno = i || 0;
  this.src = s || "";
}
function Editor()
{
  var self = this;
  this.refno = 0;
  this.cache = [];
  this.buffer = {};
  this.reModule = "\\s*\\/\\/.*[.][Jj][Ss]";
  this.reGlobalAttribute = "[\\s\\.]?ga_.*";
  this.reGlobal = "[\\s\\.]?g_.*";
  this.reMemberAttribute = "[\\.\\s]?ma_.*";
  this.reAttribute = "[\\.\\s]?a_.*";
  this.reMember = "[\\.\\s]?m_.*";
  this.reProperty = "\\(.*\\)";
  this.reGraph = "\\s*\\/\\/\\s*[Gg]raph ";
  this.invalidateCache = function(i){
    var expansionNeeded = !(i in self.cache);
    if(expansionNeeded)
    {
      var line = document.createElement("div");
      line.id = "line"+i;
      self.srcCode.appendChild(line);
      self.cache.push(line); 
    }
  }
  this.syncCacheLength = function(i){
    var j = self.cache.length;
    while(i<j--)
    {
      var div = self.cache[j];
      self.srcCode.removeChild(div);
      self.cache.pop();
      self.invalidateEditor(j,"remove",div.innerTEXT);
      j = self.cache.length;
    }  
  }
  this.invalidateEditor = function(i,op,w){
    var action = {
      "add":function(idx,u){
        var v = self.eformat(u);
        var newEntry = (u != v);
        self.cache[idx].innerTEXT = u;
        if(newEntry)
        {
          self.buffer[u] || (self.buffer[u] = new RefObj(1,v));
          self.cache[idx].innerHTML = v;
        }
        else
        {
          self.cache[idx].innerHTML = u; 
        }
        },
      "remove":function(idx,u){
        self.buffer[u] && (self.buffer[u].refno--);
        self.buffer[u] && !(self.buffer[u].refno) && (delete self.buffer[u]);
        },
      "read":function(idx,u){
        var updateNeeded = (self.cache[idx].innerTEXT != u);
        var entryFound = (u in self.buffer);
        if(updateNeeded && entryFound)
        {
          self.cache[idx].innerTEXT = u;
          self.cache[idx].innerHTML = self.buffer[u].src;
        }
        else
        if(updateNeeded)
        {
          this["add"](idx,u);
        }
        },
    };
    if(op in action){
     action[op](i,w);
    }      
  }
  this.eformat = function(line){
    var getNextVal = true;
    self.op.iForEach(
    function(prop)
    {
      var re = new RegExp(prop,"");
      if(line.match(re))
      {
        getNextVal = false;
        line = self.op[prop](line);
      }
      return getNextVal;
    });
    return line.replace(/\s/g,"&nbsp;");
  }
  this.onEditorKey = {
    "Enter":function(e){
      var lines = self.srcCodeTxt.value.split(/\n/g);
      lines.map(
      function(line,i)
      {
        self.invalidateCache(i);
        self.invalidateEditor(i,"read",line || "&nbsp;");
      });
      self.syncCacheLength(lines.length);
      },
    "default":function(e,id){
      },
  }
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
  this.op[self.reMemberAttribute] = function(u){
    if(self.isAttribute(u)){
      u = u.asAttributeTag().asMemberTag();
    }
    return u;
  };
  this.op[self.reAttribute] = function(u){
    if(self.isAttribute(u)){
      u = u.asAttributeTag();
    }
    return u;
  };
  this.op[self.reMember] = function(u){
    if(self.isProperty(u)){
      u = u.asMemberTag();
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
  this.fromTextArea = 
  this.create = function(){
    var I = arguments.length;
    var result = [];
    for(var i=0;i<I;i++){
      var id = arguments[i];
      if(id != null){
        var blaze = document.getElementById(id);
        blaze.outerHTML = "<div id='"+id+"'><div class='cssSrc' id='srcCode"+self.refno+"'></div><textarea class='cssSrcTxt' id='srcCodeTxt"+self.refno+"'></textarea></div></div>";
        var Txt = document.getElementById("srcCodeTxt"+self.refno);
        var Src = document.getElementById("srcCode"+self.refno);
        Txt.style.top = Src.offsetTop;
        Txt.style.left = Src.offsetLeft;
        Txt.editor = new Editor();
        Txt.editor.srcCode = Src;
        Txt.editor.srcCodeTxt = Txt;
        Txt.getLines = function(){
          var w = this.value
          return w
        }
        Txt.setLines = function(w){
          this.value = w
          this.editor.onEditorKey["Enter"]("init");
        }
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
        result.push(Txt);
      }
    }
    return result;
  }
}

