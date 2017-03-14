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
function updatePropertySelectWindow()
{
  var code = [];
  ARCHIVE.forEach(
  function(_name_)
  {
    var members = ARCHIVE[_name_];
    var name = _name_.replace(/^_/,"");
    code.push(name.asPropHTML());
  });
  propSelBox.innerHTML = code.join("");
}
function initPropertySelectWindow(cb)
{
  var code = [];
  ARCHIVE.forEach(
  function(_name_)
  {
    var members = ARCHIVE[_name_];
    var name = _name_.replace(/^_/,"");
    code.push(name.asPropHTML());
  });
  propSelBox.innerHTML = code.join("");
  prop1.spellcheck = false;
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
      if(ARCHIVE["_"+w] != null)
      {
        code.push(w.asPropHTML());
        if(keys[1] != null)
        {
          var v = keys[1];
          var re = new RegExp("^"+keys[1],"");
          ARCHIVE["_"+w].map(
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
          ARCHIVE["_"+w].map(
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
        ARCHIVE.forEach(
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
        ARCHIVE.forEach(
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
      'add property / attribute',
      '<br><br>',
      '<input id=prop1 onclick="" type="input"><br>',
      "<select id=propSelBox onclick=\"javascript:prop1.value = this.options[this.selectedIndex].value;\">",
      '<option default>  None  </option>',
      '</select>',
      '<br><br>',
      '<input id="propSelBoxCancel" value="Cancel" onclick="" type="button">&nbsp;&nbsp;<input id="propSelBoxOk" value="OK" onclick="" type="button">',
      '</p>',
      '</div>',
    ].join("");
    document.body.appendChild(div);
    initPropertySelectWindow();
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
    ARCHIVE = arch;
    ARCHIVE.invalidateObjProperties();
    updatePropertySelectWindow(); 
  }
  //this.init();
}