/*

TITLE:
  REGEX.JS

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

var g_reModule = "\\/\\/.*\.[Jj][Ss]";
var g_reGlobalAttribute = "^\\s*ga_";
var g_reGlobal = "^\\s*g_";
var g_reAttribute = "^\\s*a_";
var g_reMemberAttribute = "^\\s*ma_";
var g_reMemberProperty = "^\\s*m_";
var g_reProperty = "\\s*\\(.*\\)";
var g_reGraph = "\\s*\\/\\/\\s*[Gg]raph ";

var g_reModuleCapture = /\/\/\s*(.*)\.js/;
var g_reGlobalAttributeCapture = /^\s*(ga_.*)/;
var g_reGlobalCapture = /^\s*(g_.*)/;
var g_reAttributeCapture = /^\s*(a_.*)/;
var g_reMemberAttributeCapture = /^\s*(ma_.*)/;
var g_reMemberPropertyCapture = /^\s*(m_.*)/;
var g_rePropertyCapture = /^\s*(.*)/;
var g_reGraphCapture = /\/\/\s*[Gg]raph /;

var opRE = {};
opRE[g_reModule] = function(w,obj)
{
  var u = w.match(g_reModuleCapture)[1];
  var m = new Module(u);
  obj.push(m);
}
opRE[g_reGlobalAttribute] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].ga_globalAttribute.push(w.match(g_reGlobalAttributeCapture)[1]);
}
opRE[g_reGlobal] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].g_globalProperty.push(w.match(g_reGlobalCapture)[1]); 
}
opRE[g_reAttribute] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].attribute.push(w.match(g_reAttributeCapture)[1]);
}
opRE[g_reMemberAttribute] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].ma_memberAttribute.push(w.match(g_reMemberAttributeCapture)[1]);
}
opRE[g_reMemberProperty] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].m_memberProperty.push(w.match(g_reMemberPropertyCapture)[1]);
}
opRE[g_reProperty] = function(w,obj)
{
  var idx = obj.length-1;
  obj[idx].property.push(w.match(g_rePropertyCapture)[1]);
}
opRE[g_reGraph] = function(w,obj)
{
  
}
opRE.invalidateObjProperties();