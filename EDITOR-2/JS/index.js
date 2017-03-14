/*

TITLE:
  INDEX.JS

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
  js shell

INPUT:
  _

OUTPUT:
  _

*/

var editor = new Editor();

var edt;

function addCodeBody(code,spacer)
{
  spacer || (spacer = "");
  code.push(spacer+"{");
  code.push(spacer+"");
  code.push(spacer+"}"); 
}
function addMemberCodeBody(lib,code,spacer)
{  
  spacer || (spacer = "  ");
  code.push("{");
  code.push("  var self = this;");
  lib.ma_memberAttribute.map(
  function(ma)
  {
    code.push("  this."+ma+" = 0;");
  })
  lib.m_memberProperty.map(
  function(mp)
  {
    code.push("  this."+mp.replace(/(.*)\(.*\)/,"$1")+" = function"+mp.replace(/.*(\(.*\))/,"$1"));
    addCodeBody(code,"  "); 
  });
  code.push("}");
}
function updateWorkspaceData()
{  
  Object["current-workspace-data"] = [];
  edt.value.split(new RegExp(g_reGraph,""))[0].split(/\n+/).map(
  function(line)
  {
    var getNextVal = true;
    opRE.iForEach(
    function(expr)
    {
      var re = new RegExp(expr,"");
      if(line.match(re))
      {
        getNextVal = false;
        opRE[expr](line,Object["current-workspace-data"]);
      }
      return getNextVal;
    });
  });
}
function previewTool()
{
  var code = [];
  updateWorkspaceData();
  Object["current-workspace-data"].map(
  function(lib)
  {
    lib.ga_globalAttribute.map(
    function(ga)
    {
      code.push("var "+ga+" = 0;");
    });
    lib.g_globalProperty.map(
    function(gp)
    {
      code.push(""); 
      code.push("function "+gp);
      addCodeBody(code);
    })
    code.push("");
    code.push("function "+lib.name+"()");
    addMemberCodeBody(lib,code,"  ");
    lib.attribute.map(
    function(a)
    {
      code.push(lib.name+".prototype."+a+" = 0");
    })
    lib.property.map(
    function(p)
    {
      code.push(lib.name+".prototype."+p.replace(/(.*)\(.*\)/,"$1")+" = function"+p.replace(/.*(\(.*\))/,"$1"));
      addCodeBody(code);      
    });
  });
  srcTranslated.value = code.join("\n");
}
function loader()
{ 
  edt = editor.create("blazeEditor")[0];
  Object["current-workspace-property-window"] = new PropertySelectWindow();
	Object["current-workspace-property-window"].init();
	Object["current-workspace-property-window"].addWindowOKListener(propertySelectWindowCallback);
	Object["current-workspace-property-window"].addWindowCANCELListener(propertySelectWindowCallback);
  Object["current-workspace-property-window"].attachKeywordList(KEYWORD);
}
function clear_window()
{
  srcTranslated.value = "";
}
function MD5()
{
  srcTranslated.value = Math.MD5(edt.value);
}
function updateProjectTitle(fn)
{
  Object["current-workspace-filename"] = fn.replace(/\..*$/,"");
  Object["current-workspace-project-title"] = Object["current-workspace-version"] + " ( " + fn.replace(/\..*$/,"") + Object["current-workspace-file-extension"] + " )";
  document.title = Object["current-workspace-project-title"];
}
function loadFile()
{
  LoadFile(Object["current-workspace-file-extension"],
  function(fn, data){    
    updateProjectTitle(fn);
    edt.value = data.target.result;
    refreshEditor();
  });
}
function saveFile()
{
  var data = edt.value;
  SaveFile(Object["current-workspace-filename"], data, Object["current-workspace-file-extension"],
  function(fn){
    updateProjectTitle(Object["current-workspace-filename"]);
  });
}
function saveAsFile()
{
  var data = edt.value;
  SaveAsFile(data, Object["current-workspace-file-extension"],
  function(fn){
    updateProjectTitle(fn);
  });
}
function propertySelectWindowCallback(obj)
{
  var gname = obj.gname || "";
  if(gname)
  {
    edt.setRangeText(gname);
    refreshEditor();
  }
}
function refreshEditor()
{
  edt.editor.onEditorKey["Enter"]("init");
}
function showPropertySelectWindow(e)
{ 
  if(e.target.id == edt.id)
  {
    e.preventDefault();
    updateWorkspaceData();
    var moduleKeywords = {};
    Object["current-workspace-data"].map(
    function(lib)
    {
      var libName = "_"+lib.name;
      moduleKeywords[libName] = [];
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.property);
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.attribute);
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.g_globalProperty);
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.ga_globalAttribute);
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.m_memberProperty);
      moduleKeywords[libName] = moduleKeywords[libName].concat(lib.ma_memberAttribute);
    })
    Object["current-workspace-property-window"].appendKeywordList(moduleKeywords);
    Object["current-workspace-property-window"].showWindow();
  }
}
addEventListener("contextmenu", showPropertySelectWindow, false);