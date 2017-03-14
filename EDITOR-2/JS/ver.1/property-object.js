/*

TITLE: 
  PROPERTY-OBJECT.JS

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
  property-obj factory

INPUT:
  _

OUTPUT:
  _
  
SCRIPT TYPE: 
  _
  
*/

function PropertyObject(f,htm,p)
{
  this.flags = f;
  this.asHTML = htm;
  this.params = p || "()";  
}