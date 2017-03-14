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

var g_focusWildCardRE = new RegExp("\\s*\\*+","gim");
Object["current-workspace-data"] = new MetaObj("lib");
Object["current-workspace-data"].graph = [];
Object["current-workspace-global-refno"] = 0;
Object["current-workspace-global-trace-index"] = 0;
Object["current-workspace-filename"] = "";
Object["current-workspace-file-extension"] = ".json";
Object["current-workspace-project-title"] = 
Object["default-workspace-project-title"] = "js-blaze engine 1.0.0.0";
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
  var i=0
  this.__properties.sort().map( // iterate through an array of property names //
  function(o){  
    f(o,this[o],i++,this)
    return o
  })
}
Object.prototype.hasFocus = function()
{
  return (this.match(g_focusWildCardRE) && true);
}
Object.prototype.invalidate = function()
{
  var id = this.id;
  var view = {
    "srcLibraries":function(){
      var code = [];
      Object["current-workspace-data"]["libs"].map(
      function(lib)
      {
        code.push(Object["current-workspace-data"].lib[lib].asHTML);
        Object["current-workspace-data"].lib[lib].props.map(
          function(prop)
          {
            var p = Object["current-workspace-data"].lib[lib].prop[prop];
            var asHTML = p.asHTML;
            var params = p.params;
            code.push(asHTML.replace(/\(\)/,params));
            return prop;
          }
        )
        return lib;
      })
      srcLibraries.innerHTML = code.join("");
      },
    "srcCode":function(){
      var code = [];
      Object["current-workspace-data"]["graph"].map(
      function(graph)
      {
        code.push(graph.join(""));
        return graph;
      })
      srcCode.innerHTML = code.join("");
      },
  }
  if(id in view)
  {
    view[id]();
  }  
}
Object.prototype.prepad = function(n)
{
  var val = this.toString().replace(/padding\-left\:0px\;/,"padding-left:" + ( n * 24 ) + "px;")
  return val;
}
Object.prototype.asPropHTML = function()
{
  var name = this.toString();
  var entry = "<option onclick=\"prop1.value = '" + name + "';\">  " + name + "  </option>";
  return entry;
}
Object.prototype.clone = function(o){
  for(var prop in o)
  {
    if(o.hasOwnProperty(prop))
    {
        this[prop] = o[prop];
    }
  }
  this.__properties.concat(o.__properties);
  return this;
}
Object.prototype.asKeywordList = function(o,a){ // 2nd param improves performance //
  var self = this;
  var result = {};
  var arr_exists;
  var arr = self[a];
  var obj = self[o];
  (arr != null) && arr.map(
  function(lib)
  {
    var w = "_"+lib.replace(/\..*$/,"");
    result[w] = obj[lib].props;
    return lib;
  }) && (arr_exists = true);
  if(arr_exists != true)
  {
    for(var prop in obj)
    {
      if(obj.hasOwnProperty(prop) && (prop != "__properties"))
      {
        var w = "_"+prop.toString();
        result[w] = obj[prop].props;
      }
    }
  }
  result.invalidateObjProperties();
  return result;
}