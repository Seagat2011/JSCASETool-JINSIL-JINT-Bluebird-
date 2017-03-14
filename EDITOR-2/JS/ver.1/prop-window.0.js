/*

TITLE: 
  PROP-WINDOW.JS

AUTHOR: Seagat2011
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
  _  
REFERENCES:
  N/A

DESCRIPTION: 
  _

INPUT:
  _
 
OUTPUT:
  _
  
*/

ARCHIVE = {};
function updatePropertySelectBox()
{
  var code = [];
  KEYWORD.forEach(
  function(_name_)
  {
    var members = KEYWORD[_name_];
    var name = _name_.replace(/^_/,"");
    code.push(name.asPropHTML());
  });
  propSelBox.innerHTML = code.join("");
}
function initPropertySelectWindow()
{
  var code = [];
  updatePropertySelectBox();
  prop1.addEventListener("keyup",
  function(e)
  {
    var ignore = {
      "Control":1,    //e.keyCode(17)
      "ArrowHome":1,  //e.keyCode(36)
      "ArrowLeft":1,  //e.keyCode(37)
      "ArrowUp":1,    //e.keyCode(38)
      "ArrowRight":1, //e.keyCode(39)
      "ArrowDown":1,  //e.keyCode(40)
    }
    if(
    (e.target.id == "prop1") &&
    !(e.key in ignore)
    ){
      var code = [];
      var keys = prop1.value.split(/\./g);
      var I = keys.length;
      var w = keys[0];
      if(KEYWORD["_"+w] != null)
      {
        code.push(w.asPropHTML());
        if(keys[1] != null)
        {
          var v = keys[1];
          var re = new RegExp("^"+keys[1],"");
          KEYWORD["_"+w].map(
          function(prop)
          {
            if(prop.match(re))
            {
              code.push((w + "." + prop).asPropHTML());
            }
            return prop;
          });
        }
        else
        {
          KEYWORD["_"+w].map(
          function(prop)
          {
            code.push((w + "." + prop).asPropHTML());
            return prop;
          });
        }     
      }
      else
      if(keys)
      {
        var v = keys[0];
        var re = new RegExp("^"+keys[0],"");
        KEYWORD.forEach(
        function(_name_)
        {
          var name = _name_.replace(/^_/,"");          
          if(name.match(re))
          {
            code.push(name.asPropHTML());
          }
        });        
      }
      else
      {
        KEYWORD.forEach(
        function(_name_)
        {
          var name = _name_.replace(/^_/,"");
          code.push(name.asPropHTML());
        });
      }
      propSelBox.innerHTML = code.join("");
    }
  }, false);
  code = null;
  delete code;
}

function PropertySelectWindow()
{
  var self = this;
  this.init = function(){
    var div = document.createElement("div");
    div.id = "divPropSelectWindow";
    div.className = "cssOuterPropSelectWindow";
    div.innerHTML = [
      '<div class="cssInnerPropSelectWindow">',
      '<p>',
      'add property / attribute (call)',
      '<br><br>',
      '<input id=prop1 onclick="" type="input"><br>',
      '<select id=propSelBox>',
      "<option default onclick=\"javascript:prop1.value = 'None';\">  None  </option>",
      '</select>',
      '<br><br>',
      '<input id="propSelBoxCancel" value="Cancel" onclick="" type="button">&nbsp;&nbsp;<input id="propSelBoxOk" value="OK" onclick="" type="button">',
      '</p>',
      '</div>',
    ].join("");
    document.body.appendChild(div);
  }
  this.getProperty = function(){
    self.show
  }
  this.addWindowOKListener = function(cb){
    propSelBoxOk.addEventListener("click", 
    function(e){
      if(e.target.id=="propSelBoxOk")
      {
        divPropSelectWindow.style.display = "none";
        self.gname = prop1.value;
        cb(self);
      }
    }, false);
  },
  this.addWindowCANCELListener = function(cb){
    propSelBoxCancel.addEventListener("click",
    function(e){
      if(e.target.id=="propSelBoxCancel")
      {
        divPropSelectWindow.style.display = "none";
        cb(self);
      }
    }, false);
  }
  this.showWindow = function(){
    divPropSelectWindow.style.display = "block";    
  }
  this.hideWindow = function(){
    divPropSelectWindow.style.display = "none";    
  }
  this.attachKeywordList = function(arch){
    KEYWORD = arch;
    updatePropertySelectBox();
  }
  this.appendKeywordList = function(arch){
    KEYWORD.clone(arch);
    updatePropertySelectBox();
  }
  //this.init();
}