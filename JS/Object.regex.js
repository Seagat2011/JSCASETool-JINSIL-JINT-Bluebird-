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
/*
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
*/
var g_reConstructor = g_reProperty
var g_reConstructorCapture = g_rePropertyCapture

Object.prototype.REGEX = [];
Object.prototype.REGEX[g_reModule] = function(w)
{
  var u
  var U = w.match(g_reModuleCapture)
  if(U && (U.length>1)){
    u = U[1]
    var m = new Module(u);
    m._constructor.push(u+"()")
    this.push(m);
  }
  return u
}
Object.prototype.REGEX[g_reGlobalAttribute] = function(w)
{
  var u
  var U = w.match(g_reGlobalAttributeCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    if(this[idx].ga_globalAttribute.indexOf(u)<0)
    {
      this[idx].ga_globalAttribute.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reGlobal] = function(w)
{
  var u
  var U = w.match(g_reGlobalCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    if(this[idx].g_globalProperty.indexOf(u)<0)
    {
      this[idx].g_globalProperty.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reAttribute] = function(w)
{
  var u
  var U = w.match(g_reAttributeCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    if(this[idx]._attribute.indexOf(u)<0)
    {
      this[idx]._attribute.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reMemberAttribute] = function(w)
{
  var u
  var U = w.match(g_reMemberAttributeCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    if(this[idx].ma_memberAttribute.indexOf(u)<0)
    {
      this[idx].ma_memberAttribute.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reMemberProperty] = function(w)
{
  var u
  var U = w.match(g_reMemberPropertyCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    if(this[idx].m_memberProperty.indexOf(u)<0)
    {
      this[idx].m_memberProperty.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reProperty] = function(w)
{
  var u
  var U = w.match(g_reConstructorCapture)
  if(U && (U.length>1)){
    u = U[1]
    var idx = this.length-1;
    var np = u.noParams()
    var v = this[idx].name;
    var isModuleConstructor = (np == v);
    if(isModuleConstructor){
      if(this[idx]._constructor.indexOf(v+"()")<0)
      {
        this[idx]._constructor.push(u);
      }
      else
      {
        var j = this[idx]._constructor.indexOf(v+"()")
        this[idx]._constructor[j] = u
      }
    }
    else
    if(this[idx]._property.indexOf(u)<0){
      this[idx]._property.push(u);
    }
  }
  return u
}
Object.prototype.REGEX[g_reGraph] = function(w)
{
  var u;
  return u
}