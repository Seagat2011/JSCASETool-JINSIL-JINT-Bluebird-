/*

TITLE: 
  ARRAY.JS

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
  

OUTPUT:
  
*/

Array.prototype.insertAt = function(j,u){
  this.unshift(0);
  var pass = false;
  var a = this.map(
  function(val,i,me){
    if(i==j)
    {
      pass = true;
      val = u;
    }
    else
    if(!pass){
      val = me[i+1];
    }
    return val;
  });
  return a;
}
Array.prototype.removeAt = function(i){
  this.splice(i,1);
}