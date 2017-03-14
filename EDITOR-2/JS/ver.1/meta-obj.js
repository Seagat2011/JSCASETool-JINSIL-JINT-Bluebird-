/*

TITLE: 
  META-OBJECT.JS

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
  meta-obj factory

INPUT:
  _

OUTPUT:
  _
  
SCRIPT TYPE: 
  _
  
*/

function MetaObj()
{
  var self = this;
  var I = arguments.length;
  for(var i = 0;i<I;i++){
    var s  = arguments[i];
    self[s] = {};
    self[s+'s'] = [];
  }
  return self;
}