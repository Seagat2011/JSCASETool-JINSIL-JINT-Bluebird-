/*

TITLE: 
  OBJECT.JS

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
  obj shell

INPUT:
  _

OUTPUT:
  _  
  
*/

Object["current-workspace-data"] = [];
//Object["current-workspace-data"].graph = [];
Object["current-workspace-global-refno"] = 0;
Object["current-workspace-global-trace-index"] = 0;
Object["current-workspace-filename"] = "";
Object["current-workspace-file-extension"] = ".json";
Object["current-workspace-project-title"] = 
Object["current-workspace-version"] = "js-blaze engine 1.0.0.0";
Object.prototype.__properties = [];
Object.prototype.invalidateObjProperties = function(){
  var self = this;
  self.__properties = [];
  for(var i in self)
  {
    if(self.hasOwnProperty(i) && (i != "__properties"))
    {
      self.__properties.push(i);
    }
  }
}
Object.prototype.forEach = function(f){
  var i=0;
  this.__properties.map( // iterate array for optimal performance //
  function(o){  
    f(o,this[o],i++,this)
    return o;
  })
}
Object.prototype.iForEach = function(f){
  var I = this.__properties.length;
  for(var i=0;i<I;i++)
  {
    var o = this.__properties[i];
    if(!f(o,this[o],i,this) ){
      break;
    }
  }
}
Object.prototype.clone = function(o){
  for(var prop in o)
  {
    if(o.hasOwnProperty(prop))
    {
        this[prop] = o[prop];
    }
  }
  this.invalidateObjProperties();
  return this;
}
Object.prototype.asPropHTML = function()
{
  var name = this.toString();
  var entry = "<option onclick=\"prop1.value = '" + name + "';\">  " + name + "  </option>";
  return entry;
}
Object.prototype.asTag = function(u){
  var result = "<"+u+">"+this.toString()+"</"+u+">";
  return result;
}
Object.prototype.asModuleTag = function(){
  return this.asTag("module");
}
Object.prototype.asPropertyTag = function(){
  return this.asTag("property");
}
Object.prototype.asAttributeTag= function(){
  return this.asTag("attribute");
}
Object.prototype.asMemberTag= function(){
  return this.asTag("member");
}
Object.prototype.asGlobalTag= function(){
  return this.asTag("global");
}
Object.prototype.asParamsTag = function(){
  return this.asTag("params");
}
Object.prototype.asGraphTag= function(){
  return this.asTag("graph");
}