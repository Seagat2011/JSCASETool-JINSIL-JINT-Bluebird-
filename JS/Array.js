/*

TITLE: 
  ARRAY.JS

AUTHOR: Seagat2011 ( Michelle Antonello )
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  JSCASETool / README

DESCRIPTION: 
  JINSIL / JINT Bluebird convert stacktraces,
  inline macros, and vars to javascript

INPUT:
  _

OUTPUT:
  _
  
SCRIPT TYPE: 
  prototype shell

*/

Array.prototype.Repack = function() 
{
    var obj = []
    this.map(function(v, i, me) {
        if (v) {
            obj.push(v)
        }
        return v
    })
    return obj
}
Array.prototype.Filter = function() 
{
    var filter = arguments[0] || '.*' // accept any string as a Regular Expression (RE)
    var byStride = arguments[1] || 1
    var i = 0
    var obj = []
    this.map(function(v, i, me) {
        if (v && v.match(filter) && i++ % byStride) {
            obj.push(v)
        }
        return v
    })
    return obj
}